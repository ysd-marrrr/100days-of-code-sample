import requests
from bs4 import BeautifulSoup

# Organizationsのユーザーでとりあえず1ページ目を取り出す
o_s = requests.get("https://qiita.com/organizations/opst/members")

# ページ全体をBeautifulSoup
o_soup = BeautifulSoup(o_s.text, features="html.parser")

# メンバー表示部を選択
member = o_soup.find("ul", attrs={"class", "p-organization_memberlist"})

# メンバーのリストを取得
member_list = member.find_all("div", attrs={"class", "od-MemberCardContent"})

# メンバーの名前を出してみる
for m in member_list:
    name = m.contents[0].find("strong", attrs={"class", "od-MemberCardHeaderIdentities_username"}).contents
    print(name)