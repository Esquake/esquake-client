import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import * as products from "../../assets/shelter.json";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})

export class GoogleMapComponent {

  @ViewChild("map") mapElement;
  map: any;
  coords: any;
  address: any;
  private shelter: any;
  constructor(private geolocation: Geolocation,
    private platform: Platform,
    private nativeGeocoder: NativeGeocoder) {
    this.coords = {
      lat: null,
      lng: null
    } 
  }

  search() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

  this.nativeGeocoder.forwardGeocode(this.address);
  
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then(pos => {
        this.coords.lat = pos.coords.latitude
        this.coords.lng = pos.coords.longitude
        console.log(this.coords.lat, this.coords.lng)
        this.getNearestShelter(5);
        this.initMap();
      }).catch((error) => {
        console.log(error);
        console.log(JSON.stringify(error));
        console.log("error");
      })
    })
    console.log(this.coords)
  }

  getNearestShelter(max) {
    var local_shelter = this.getNearShelter(20);
    // console.log(local_shelter);
    for (let index = 0; index < local_shelter.length; index++) {
      local_shelter[index]["dist"] = this.getDistance(this.coords, local_shelter[index]);
      // console.log(this.getDistance(this.coords, local_shelter[index]))
      // console.log("shel"+local_shelter[index]);
    }

    var rShelter = local_shelter.sort(function (a, b) {
      return a.dist - b.dist;
    }).slice(0, max);
    this.shelter = rShelter;
    return rShelter;
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
    dist *= 60 * 1852;
    return dist;
  }

  deg2rad(deg) {
    return (deg * Math.PI / 180.0);
  }

  rad2deg(rad) {
    return (rad * 180.0 / Math.PI);
  }

  initMap() {
    console.log(this.shelter)
    let mapOptions: google.maps.MapOptions = {
      center: this.coords,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
    //현 위치 마커
    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: this.coords,
      icon: { url : '../../assets/imgs/currentMarkerImage.png'}
    });
    
    var service = new google.maps.places.PlacesService(this.map);
    

    var otherMarker, i;
    var infowindow = new google.maps.InfoWindow();

    for (i = 0; i < this.shelter.length; i++) {
      console.log(this.shelter[i]['dist'])
      otherMarker = new google.maps.Marker({
        position: new google.maps.LatLng(this.shelter[i]['lat'], this.shelter[i]['lng']),
        map: this.map,
        icon: { url : '../../assets/imgs/icMarker.png'}
      });

      google.maps.event.addListener(otherMarker, 'click', (function (otherMarker,i) {
        return function () {
          infowindow.setContent(this.shelter[i]['name']);
          infowindow.open(this.map, this);
        }
      })(marker, i));
    }
  }
  
}


