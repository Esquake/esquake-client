class Map {
    constructor(elementId) {
        this.map = new daum.maps.Map(
            document.getElementById(elementId),
            {
                center: new daum.maps.LatLng(37.6, 127), //지도의 중심좌표.
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

    // TODO : 랜덤으로 좌표 생성하는 기능 추가
    getRandomLocaton() {

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
}


document.addEventListener("DOMContentLoaded", function () {
    let map = new Map('map');
    map.getRoadAddress();
});