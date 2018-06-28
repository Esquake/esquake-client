class Map {
    constructor() {
        this.map = new daum.maps.Map(
            document.getElementById('map'),
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

    getRoadAddress() {

        // TODO : GPS에서 데이터 가져오는 기능 추가

        this.searchDetailAddrFromCoords(this.map.getCenter(), function (result, status) {
            if (status === daum.maps.services.Status.OK) {
                this.current = result[0];
            }
        });
    }
}


document.addEventListener("DOMContentLoaded", function () {
    let map = new Map();
    map.getRoadAddress();
});