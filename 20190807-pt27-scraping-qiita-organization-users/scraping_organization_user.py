import requests
from bs4 import BeautifulSoup

def recv_orgs_users(orgs_name):
    member_id_list = []
    url = 'https://qiita.com/organizations/{}/members'.format(orgs_name)
    url_base = 'https://qiita.com'

    while True:
        # Organizationsのユーザーでとりあえず1ページ目を取り出す
        print(url)
        o_s = requests.get(url)

        # ページ全体をBeautifulSoup
        o_soup = BeautifulSoup(o_s.text, features='html.parser')

        # メンバー表示部を選択
        member_soup = o_soup.find('ul', attrs={'class', 'p-organization_memberlist'})

        # メンバーのリストを取得
        member_list_soup = member_soup.find_all('div', attrs={'class', 'od-MemberCardContent'})

        # メンバーの名前を出してみる
        for m in member_list_soup:
            name = m.contents[0].find('strong', attrs={'class', 'od-MemberCardHeaderIdentities_username'}).contents
            id = m.contents[0].find('span', attrs={'class', 'od-MemberCardHeaderIdentities_userid'}).contents[0]
            member_id_list.append(id.split('@')[1])

        next_pg_soup = o_soup.find('a', attrs={'class': 'st-Pager_link', 'rel': 'next'})
        if not next_pg_soup:
            break

        url = url_base + next_pg_soup.get('href')
    
    return member_id_list


def recv_user_json(user_id):
    print('@{}'.format(user_id))
    api_url = ' https://qiita.com/api/v2/users/{}'.format(user_id)
    result = requests.get(api_url)
    print('残り {} 回 / {}'.format(result.headers['rate-remaining'], result.headers['rate-limit']))
    print(result.text)
    return result.text


member_id_list = recv_orgs_users('opst')

if len(member_id_list) >= 60:
    print('ユーザー数が60を超えています。すべて取得するには認証する必要があります。')

for user_id in member_id_list:
    member_json = recv_user_json(user_id)