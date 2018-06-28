function generateMap() {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.6, 127), //지도의 중심좌표.
        level: 13
    };

    map = new daum.maps.Map(container, options); // 지도 호출

    map.setDraggable(true);
    map.setZoomable(true);
}

function getNearShelter() {

}

document.addEventListener("DOMContentLoaded", function () {
    generateMap();
});