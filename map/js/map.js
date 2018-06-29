class Map {
    constructor(elementId) {

        this.current = {
            lat: 37.6,
            lng: 127
        };

        this.map = new daum.maps.Map(
            document.getElementById(elementId),
            {
                center: new daum.maps.LatLng(
                    this.current.lat,
                    this.current.lng
                ), //지도의 중심좌표.
                level: 13
            }
        );

        this.map.setDraggable(true);
        this.map.setZoomable(true);
        this.geocoder = new daum.maps.services.Geocoder();
    }

    searchDetailAddrFromCoords(coords, callback) {
        this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    getRoadAddress() {

        // TODO : GPS에서 데이터 가져오는 기능 추가

        this.searchDetailAddrFromCoords(this.map.getCenter(), function (result, status) {
            if (status === daum.maps.services.Status.OK) {
                // return result;
                console.log(result);
            }
        });
    }

    getDistance(from, to) {
        var theta = from.lng - to.lng;
        var dist = Math.sin(this.deg2rad(from.lat)) * Math.sin(this.deg2rad(to.lat))
            + Math.cos(this.deg2rad(from.lat)) * Math.cos(this.deg2rad(to.lat))
            * Math.cos(this.deg2rad(theta));

        dist = Math.acos(dist);
        dist = this.rad2deg(dist);
        dist *= 60 * 1852;
        return dist;
    }

    deg2rad(deg) {
        return (deg * Math.PI / 180.0);
    }

    rad2deg(rad) {
        return (rad * 180.0 / Math.PI);
    }

    getNearShelter() {
        return JSON.parse(data)["records"];
    }

    getNearestShelter(max) {

        var shelter = this.getNearShelter();

        // 거리 계산
        for (let i = 0; i < shelter.length; i++) {
            shelter[i]["dist"] = this.getDistance(this.current, shelter[i]);
        }

        // 정렬 후 지정한 길이만큼 리턴
        var rShelter = shelter.sort(function (a, b) {
            return a.dist - b.dist;
        }).slice(0, max);

        return rShelter;

    }
}


document.addEventListener("DOMContentLoaded", function () {
    let map = new Map('map');
    console.log(map.getRoadAddress());
    console.log(map.getNearestShelter(3));
});
