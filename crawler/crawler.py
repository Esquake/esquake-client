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
        self.interval = 1

        # Use a service account
        cred = credentials.Certificate('./serviceAccountKey.json')
        self.app = firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        self.users_ref = self.db.collection(u'earthquake')
        pass

    def setTime(self):
        now = datetime.datetime.now()
        self.param["fromTmFc"] = (now - datetime.timedelta(days=1)).strftime("%Y%m%d")
        self.param["toTmFc"] = now.strftime("%Y%m%d")
        pass

    def run(self):
        cnt = 0
        while cnt != 0:
            cnt += 1
            time.sleep(self.interval)

            self.setTime()
            target = self.url + "?" + urllib.parse.urlencode(self.param)

            result = urllib.request.urlopen(target).read().decode('utf-8')
            response = json.loads(json.dumps(xmltodict.parse(result)))

            if response["response"]["body"]["items"] is None:
                continue
                pass

            for item in response["response"]["body"]["items"]["item"]:
                print(item)
                self.users_ref.add(item)
                pass
            pass
        pass

    pass


if __name__ == '__main__':
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
