import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';

import * as products from "../../assets/shelter.json";


import {
  KakaoMapsProvider,
  LatLng,
  LatLngBounds,
  MapTypeId,
  MapTypeControl,
  ControlPosition,
  OverlayMapTypeId,
  KakaoEvents,
  Marker,
  OverlayType,
  DrawingManager,
  Toolbox,
  Size,
  Point,
  MarkerImage,
 
} from 'kakao-maps-sdk';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  position;
  mapConfig = { width: '100%', height: '50%' };
  flagg = true;
  marker;
  KaKaoJavascriptAPIKey = '172283aea22a2859764d0f5c96a12445';
  
  constructor(public navCtrl: NavController, public modalCtrl : ModalController,
    public _kakaoMapsProvider: KakaoMapsProvider,
    public geoLocate : Geolocation,
    public file : File,
    //public http : Http,
  
  ) {
    this.initPage();
    this.initializeMap();

    console.log(products);
    //this.maps = window['daum'];

    
    this.current = {
      lat: 37.6,
      lng: 127
    };

    _kakaoMapsProvider
      .loadKakaoMapSDK(this.KaKaoJavascriptAPIKey)
      .then(
        () => {
          let mapConfig = {
            center: new LatLng(this.current.lat, this.current.lng),
            mapTypeId: MapTypeId.ROADMAP,
          };
          _kakaoMapsProvider
            .init('kakaomaps-div', mapConfig)
            .then(() => {
              _kakaoMapsProvider.getMapInstance().addOverlayMapTypeId(OverlayMapTypeId.BICYCLE_HYBRID);

              let events: KakaoEvents[] = [
                'center_changed',
                'zoom_start',
                'zoom_changed',
                'bounds_changed',
                'click',
                'dblclick',
                'rightclick',
                'mousemove',
                'dragstart',
                'drag',
                'dragend',
                'idle',
                'tilesloaded',
                'maptypeid_changed',
              ];
              _kakaoMapsProvider.addListeners(_kakaoMapsProvider.getMapInstance(), events, res => {
                // if(res.event == 'click'){}
                // console.log(res);
              });

              this.getNearestShelter(5);
              this.generateMarker();

            })
            .catch();
        },
        err => {
          // console.log('err ', err);
        }
      )
      .catch(e => {
        // console.log('catch ', e);
      });
  }
  private daum:any;
  private maps:any;
  private title :any;
  private current:any;

  private shelter:any;

      // resp.coords.longitude lng
  
  private _productURL = 'api/products/products.json';    
 
  getLocalData() {

    
    //console.log(this.file.dataDirectory);
    //this.file.readAsText(this.file.applicationDirectory + "www/assets", "data.json").then(...);
    //https://ionicframework.com/docs/native/file/
  }
  initPage(){
    console.log("init page");
    this.title = "geo module";
  }

  showModal(){
    let profileModal = this.modalCtrl.create("SearchShelterPage");
    
    profileModal.onDidDismiss(data => {
      console.log(data);
      this.title = data;
    });
    profileModal.present();
  }

  showCardModal(){
    let profileModal = this.modalCtrl.create("ShowSheltersPage");
    profileModal.onDidDismiss(data =>{
      console.log("data");
    });
    profileModal.present();
  }

  updateLocate(){
    console.log("read me");
    this.geoLocate.getCurrentPosition().then((resp) => {
      // resp.coords.latitude lat 
      // resp.coords.longitude lng

      this.current["lat"] = resp.coords.latitude;
      this.current["lng"] = resp.coords.longitude;

      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.updateMap();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     let watch = this.geoLocate.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data);
     });
  }

  updateMap() {
    for (let index = 0; index < this.shelter.length; index++) {
      this.shelter[index]["marker"].setMap(null);
    }
    this.shelter = [];
    this.current["marker"].setMap(null);
    this.getNearestShelter(3);
    this.generateMarker();
  }
  
  initializeMap(){
    
  }

  addToolbox() {
    // 도형 스타일을 변수로 설정합니다
    var strokeColor = '#39f',
      fillColor = '#cce6ff',
      fillOpacity = 0.5,
      hintStrokeStyle = 'dash';

    var options = {
      // Drawing Manager를 생성할 때 사용할 옵션입니다
      map: this._kakaoMapsProvider.getMapInstance(), // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
      drawingMode: [
        OverlayType.MARKER,
        OverlayType.ARROW,
        OverlayType.POLYLINE,
        OverlayType.RECTANGLE,
        OverlayType.CIRCLE,
        OverlayType.ELLIPSE,
        OverlayType.POLYGON,
      ],
      // 사용자에게 제공할 그리기 가이드 툴팁입니다
      // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
      guideTooltip: ['draw', 'drag', 'edit'],
      markerOptions: {
        draggable: true,
        removable: true,
      },
      arrowOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        hintStrokeStyle: hintStrokeStyle,
      },
      polylineOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        hintStrokeStyle: hintStrokeStyle,
      },
      rectangleOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },
      circleOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },
      ellipseOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },
      polygonOptions: {
        draggable: true,
        removable: true,
        strokeColor: strokeColor,
        fillColor: fillColor,
        fillOpacity: fillOpacity,
      },
    };

    // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
    var manager = new DrawingManager(options);

    // Toolbox를 생성합니다.
    // Toolbox 생성 시 위에서 생성한 DrawingManager 객체를 설정합니다.
    // DrawingManager 객체를 꼭 설정해야만 그리기 모드와 매니저의 상태를 툴박스에 설정할 수 있습니다.
    var toolbox = new Toolbox({ drawingManager: manager });

    // 지도 위에 Toolbox를 표시합니다
    // daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOP은 위 가운데를 의미합니다.
    this._kakaoMapsProvider.getMapInstance().addControl(toolbox.getElement(), ControlPosition.TOP);
  }

  getRandomInRange(from, to, fixed) {    
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;    
  }

  getNearShelter(key) {
    return products["records"];
  }

  getDistance(from, to) {
    var theta = from.lng - to.lng;
    var dist = Math.sin(this.deg2rad(from.lat)) * Math.sin(this.deg2rad(to.lat))
        + Math.cos(this.deg2rad(from.lat)) * Math.cos(this.deg2rad(to.lat))
        * Math.cos(this.deg2rad(theta));

    dist = Math.acos(dist);
    dist = this.rad2deg(dist);
    dist *= 60* 1852;
    return dist;
  }

  deg2rad(deg) {
      return (deg * Math.PI / 180.0);
  }

  rad2deg(rad) {
      return (rad * 180.0 / Math.PI);
  }

  getNearestShelter(max) {
    var local_shelter = this.getNearShelter(20);
    for (let index = 0; index < local_shelter.length; index++) {
      local_shelter[index]["dist"] = this.getDistance(this.current, local_shelter[index]);
      //console.log(local_shelter[index]);
    }

    var rShelter = local_shelter.sort(function (a, b) {
      return a.dist - b.dist;
    }).slice(0, max);

    this.shelter = rShelter;
    return rShelter;
  }

  generateMarker() {
    // 대피소 마커 생성
    var bounds = new LatLngBounds(
      new LatLng(this.current["lat"], this.current["lng"]),
      new LatLng(this.current["lat"], this.current["lng"])
    );

    var position = null;
    var shelterMarkerImage = new MarkerImage(
      "../../assets/imgs/shelterMarkerImage.png",
      new Size(25, 32),
      {offset: new Point(0, 0)}
    );

    for (let i = 0; i < this.shelter.length; i++) {
      position = new LatLng(
      parseFloat(this.shelter[i]["lat"]),
      parseFloat(this.shelter[i]["lng"])
        );
        bounds.extend(position);
        
        this.shelter[i]["marker"] = new Marker({
            position: position,
            image: shelterMarkerImage
        });
        this.shelter[i]["marker"].setMap(this._kakaoMapsProvider.getMapInstance());
    }

    // 현재 위치 마커 생성
    position = new LatLng(this.current["lat"], this.current["lng"]);
    bounds.extend(position);

    this.current["marker"] = new Marker({
        position: position,
        image: new MarkerImage(
            "../../assets/imgs/currentMarkerImage.png",
            new Size(40, 40),
            {offset: new Point(0, 0)}
        )
    });

    this.current["marker"].setMap(this._kakaoMapsProvider.getMapInstance());
}

  removeMarker() {
    this.marker.setMap(null);
  }
  
  addMarker() {
    this.marker.setMap(this._kakaoMapsProvider.getMapInstance());
  }

  getPosition() {
    this.position = this._kakaoMapsProvider.getMapInstance().getCenter();
    this.marker = new Marker({ position: this.position });
  }

  addOverlay() {
    this._kakaoMapsProvider.getMapInstance().addOverlayMapTypeId(OverlayMapTypeId.TRAFFIC);
  }
  removeOverlay() {
    this._kakaoMapsProvider.getMapInstance().removeOverlayMapTypeId(OverlayMapTypeId.TRAFFIC);
  }

  changeLayout() {
    let option = {
      width: '100%',
      height: '50%',
    };
    if (this.flagg) {
      option = {
        width: '100%',
        height: '30%',
      };
    } else {
      option = {
        width: '100%',
        height: '50%',
      };
    }
    this.mapConfig = option;
    this.flagg = !this.flagg;
  }

  
}
