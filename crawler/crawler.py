import urllib.parse, urllib.request
import xmltodict, json
import time


class Crawler:
    def __init__(self, url, param):
        self.url = url
        self.param = param
        self.interval = 1
        pass

    def setTime(self):
        self.param["fromTmFc"] = "20170628"
        self.param["toTmFc"] = "20180629"

    def run(self):
        while True:
            time.sleep(self.interval)

            self.setTime()
            target = self.url + "?" + urllib.parse.urlencode(self.param)

            result = urllib.request.urlopen(target).read().decode('utf-8')
            response = json.loads(json.dumps(xmltodict.parse(result)))

            for item in response["response"]["body"]["items"]["item"]:
                print(item)
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
