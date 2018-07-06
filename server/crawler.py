import requests
import urllib.parse
import urllib.request
import xmltodict
import json
import time
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class Crawler:
    def __init__(self, url, param):
        self.url = url
        self.param = param
        self.interval = 3

        # Use a service account
        cred = credentials.Certificate('./serviceAccountKey.json')
        self.app = firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        self.earthquake_ref = self.db.collection(u'earthquake')
        pass

    def setTime(self):
        now = datetime.datetime.now()
        self.param["fromTmFc"] = (now - datetime.timedelta(days=3)).strftime("%Y%m%d")
        self.param["toTmFc"] = now.strftime("%Y%m%d")
        pass

    def find(self, key):
        docs = self.earthquake_ref.where('tmEqk', '==', key).get()
        rFind = False

        for doc in docs:
            rFind = True
            break

        return rFind

    def run(self):
        while True:
            time.sleep(self.interval)

            self.setTime()
            target = self.url + "?" + urllib.parse.urlencode(self.param)

            result = urllib.request.urlopen(target).read().decode('utf-8')
            #print(result)
            response = json.loads(json.dumps(xmltodict.parse(result)))
            when = response["response"]["body"]["items"]["item"]["tmEqk"]
            when2 = when[4:6] + "-" + when[6:8] + " " + when[8:10] + ":" + when[10:12]
            mt = response["response"]["body"]["items"]["item"]["mt"]
            loc = response["response"]["body"]["items"]["item"]["loc"]
            title = when2 + " " + loc + " 규모 " + mt
            if float(mt) <= 3.0 :
                content = "눌러서 가까운 대피소를 확인하세요."
            else :
                content = "눌러서 가장 가까운 대피소로 이동하세요."

            payload = {"app_id": "0d931a3c-8465-40dd-abaf-d747c18b4465", "included_segments": ["All"],
                        "headings": {"en": title}, "contents": {"en": content},
                        "smallicon": "ic_launcher_APP.png"}

            req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
            if response["response"]["body"]["items"] is None:
                continue
                pass
            tmEqk = response["response"]["body"]["items"]["item"]['tmEqk']
            if tmEqk :
                if not self.find(tmEqk) :
                    self.earthquake_ref.add(response["response"]["body"]["items"]["item"])
                    print("Data insert success")
                    print(response["response"]["body"]["items"]["item"])
                    req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
                    print(req)
                    pass
                else:
                    print("Data already exists.")
                    pass
            pass
        pass

    pass


if __name__ == '__main__':
    header = {"Content-Type": "application/json; charset=utf-8", "Authorization": "Basic MjZhZjM1ZjYtN2U4Ni00ZTgyLTkzMDctMmIzYmVmZmRiYmM5"}
    #payload = {"app_id": "0d931a3c-8465-40dd-abaf-d747c18b4465", "include_player_ids": ["77d716d8-bfce-4e75-942e-134558299a78"], "headings": {"en": "English Title"}, "contents": {"en": "English Message"}}
    crawler = Crawler(
        "http://newsky2.kma.go.kr/service/ErthqkInfoService/EarthquakeReport",
        {
            "ServiceKey": "HSeW3WYsz0KZNY7/n0SI/NLPiJwxRCNFn4hWIGc4/XE1az5DdriCcF/fsytZyzcy0q5kG0+KXL8wT1S+w1nCpg==",
            "fromTmFc": None,
            "toTmFc": None
        }
    )
    crawler.run()
    pass
