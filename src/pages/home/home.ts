import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
//import { HttpClient } from '@angular/common/http';
import {
  KakaoMapsProvider,
  LatLng,
  MapTypeId,
  MapTypeControl,
  ControlPosition,
  OverlayMapTypeId,
  KakaoEvents,
  Marker,
  OverlayType,
  DrawingManager,
  Toolbox,
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
    public _kakaoMapsProvider: KakaoMapsProvider
  ) {
    this.initPage();
    this.initializeMap();
    this.maps = window['daum'];

    _kakaoMapsProvider
      .loadKakaoMapSDK(this.KaKaoJavascriptAPIKey)
      .then(
        () => {
          let mapConfig = {
            center: new LatLng(33.450701, 126.570667),
            mapTypeId: MapTypeId.ROADMAP,
          };
          _kakaoMapsProvider
            .init('kakaomaps-div', mapConfig)
            .then(() => {
              _kakaoMapsProvider.getMapInstance().addControl(new MapTypeControl(), ControlPosition.BOTTOM);
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

              this.marker = new Marker({ position: new LatLng(33.450701, 126.570667) });
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
  

  getLocalData() {
    /*this.httpClient.get('../assets/data/cards.json').map(res => res.json()).subscribe(data => 
    {
      console.log(data);
    });*/  
  }
  initPage(){
    console.log("init page");
    this.title = "geo module";
  }
  showModal(){
    let profileModal = this.modalCtrl.create("SearchShelterPage");
    console.log("soicem");
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
    console.log("updateLocate");
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
