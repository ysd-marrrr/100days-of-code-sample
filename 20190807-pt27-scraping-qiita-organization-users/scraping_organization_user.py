import requests
from bs4 import BeautifulSoup

member_id_list = []
url = "https://qiita.com/organizations/opst/members"
url_base = "https://qiita.com"

while True:
    # Organizationsのユーザーでとりあえず1ページ目を取り出す
    print(url)
    o_s = requests.get(url)

    # ページ全体をBeautifulSoup
    o_soup = BeautifulSoup(o_s.text, features="html.parser")

    # メンバー表示部を選択
    member_soup = o_soup.find("ul", attrs={"class", "p-organization_memberlist"})

    # メンバーのリストを取得
    member_list_soup = member_soup.find_all("div", attrs={"class", "od-MemberCardContent"})

    # メンバーの名前を出してみる
    for m in member_list_soup:
        name = m.contents[0].find("strong", attrs={"class", "od-MemberCardHeaderIdentities_username"}).contents
        id = m.contents[0].find("span", attrs={"class", "od-MemberCardHeaderIdentities_userid"}).contents[0]
        member_id_list.append(id.split('@')[1])

    next_pg_soup = o_soup.find("a", attrs={"class": "st-Pager_link", "rel": "next"})
    if not next_pg_soup:
        break

    url = url_base + next_pg_soup.get("href")

print(member_id_list)