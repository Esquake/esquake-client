import urllib.parse, urllib.request
import re


class Crawler:
    def __init__(self, url, param):
        self.url = url
        self.param = param
        self.interval = 10
        pass

    def setTime(self):
        self.param["fromTmFc"] = "20170628"
        self.param["toTmFc"] = "20180629"

    def run(self):
        self.setTime()
        target = self.url + "?" + urllib.parse.urlencode(self.param)

        print("TARGET : " + target)

        req = urllib.request.urlopen(target)
        r = req.read()
        req.close()

        result = r.decode('utf-8', 'ignore').split('\n')

        print(result)
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
