import sys
import os
import json
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import pytz

# tokenの読み込み
qiita_token = os.getenv('QIITA_TOKEN')
qiita_request_header = {}
if qiita_token:
    print("環境変数の QIITA_TOKEN で認証します")
    qiita_request_header = {'Authorization': 'Bearer ' + qiita_token}


# Qiita OrganizationのユーザーIDをすべて取得する
def recv_orgs_users(orgs_name):
    member_id_list = []
    url = f'https://qiita.com/organizations/{orgs_name}/members'
    url_base = 'https://qiita.com'

    while True:
        # Organizationsのユーザーでとりあえず1ページ目を取り出す
        print(url)
        o_s = requests.get(url)

        # ページ全体をBeautifulSoup
        o_soup = BeautifulSoup(o_s.text, features='html.parser')

        # メンバー表示部を選択
        member_soup = o_soup.find(
            'ul', attrs={'class', 'p-organization_memberlist'})

        # メンバーのリストを取得
        member_list_soup = member_soup.find_all(
            'div', attrs={'class', 'od-MemberCardContent'})

        # メンバーの名前を出してみる
        for m in member_list_soup:
            name = m.contents[0].find(
                'strong', attrs={'class', 'od-MemberCardHeaderIdentities_username'}).contents
            id = m.contents[0].find(
                'span', attrs={'class', 'od-MemberCardHeaderIdentities_userid'}).contents[0]
            member_id_list.append(id.split('@')[1])

        next_pg_soup = o_soup.find(
            'a', attrs={'class': 'st-Pager_link', 'rel': 'next'})
        if not next_pg_soup:
            break

        url = url_base + next_pg_soup.get('href')

    return member_id_list


# Qiitaのユーザー詳細情報を取得する
def recv_user_json(user_id):
    api_url = f'https://qiita.com/api/v2/users/{user_id}'
    result = requests.get(api_url, headers=qiita_request_header)
    print('Qiitaユーザー取得中: {} 残り {} 回 / {}'.format(user_id, result.headers['rate-remaining'], result.headers['rate-limit']))
    return result.json()


# Qiitaの投稿を取得する
def extract_qiita_item(user_name):
    url = f"https://qiita.com/api/v2/users/{user_name}/items"
    payload = {'page': 1, 'per_page': 1}
    response = requests.get(url, params=payload, headers=qiita_request_header)
    if response.status_code != 200:
        return None

    item = response.json()
    try:
        r = {}
        r['title'] = item[0]['title']
        r['url'] = item[0]['url']
        r['updated_at'] = item[0]['updated_at']
        return r
    except IndexError:
        return None
    except TypeError:
        return None


# Qiita APIの''やNoneに対応できる表示をする
def print_optional(optional_str):
    if not optional_str or len(optional_str) == 0:
        return 'なし'

    return optional_str


# GitHubのISO形式タイムスタンプをAsia/Tokyoのdatetimeに変換する
# https://qiita.com/estaro/items/2b7074839d2a5e883dc1
def iso_to_jstdt(iso_str):
    dt = datetime.strptime(iso_str, '%Y-%m-%dT%H:%M:%SZ')
    dt = pytz.utc.localize(dt).astimezone(pytz.timezone("Asia/Tokyo"))
    return dt


# GitHubのリポジトリオブジェクトからforkしていないものを一つ取得する
def extract_nonfork_repo(repos):
    for repo in repos:
        if not repo['fork']:
            r = {}
            r['full_name'] = repo['full_name']
            r['language'] = repo['language']
            r['html_url'] = repo['html_url']
            r['description'] = repo['description']
            r['pushed_at'] = iso_to_jstdt(
                repo['pushed_at']).strftime('%Y-%m-%d %H:%M:%S')
            return r

    return None


# 指定されたユーザーの最新のリポジトリを取得する
def extract_latest_repo(user_name):
    url = f"https://api.github.com/users/{user_name}/repos"
    payload = {'sort': 'pushed'}
    response = requests.get(url, payload)
    if response.status_code != 200:
        return None

    page = 1
    while 1:
        # print(f"Page: {page}, times left: {response.headers['X-RateLimit-Remaining']}")
        repo = extract_nonfork_repo(response.json())
        if repo:
            return repo

        try:
            if 'rel="next"' not in response.headers['Link']:
                break
        except KeyError:
            return None
        page += 1
        payload['page'] = page
        response = requests.get(url, payload)

    return None



member_id_list = recv_orgs_users('opst')

if len(member_id_list) >= 60 and not qiita_token:
    print('ユーザー数が60を超えています。すべて取得するには認証する必要があります。')
    sys.exit(1)

members = []
for user_id in member_id_list:
    members.append(recv_user_json(user_id))


for i, user in enumerate(members):
    # 取得失敗ならスキップ
    if not user:
        continue

    print('----------------------------------------')
    print(f"@{user['id']}: {user['name']}")
    print(print_optional(user['description']))
    print()
    # 記事の表示
    qiita_item = extract_qiita_item(user['id'])
    if qiita_item:
        print(f"[Qiita] {qiita_item['title']}")
        print(qiita_item['url'])
        print(qiita_item['updated_at'])
    else:
        print('[Qiita] なし')

    # GitHubの表示
    if user['github_login_name'] and len(user['github_login_name']) != 0:
        print(f"[GitHub] @{user['github_login_name']}")
        github_item = extract_latest_repo(user['github_login_name'])
        if github_item:
            print(f"\t{github_item['language']}> {github_item['full_name']} - {github_item['description']}")
            print(f"\t{github_item['html_url']}")
            print(f"\tlast pushed: {github_item['pushed_at']}")
        else:
            print('*** まだGitHubでアウトプットしていないようです ***')
    else:
        print("[GitHub] なし")
    print()
