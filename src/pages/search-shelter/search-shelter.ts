import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SearchShelterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-shelter',
  templateUrl: 'search-shelter.html',
})
export class SearchShelterPage {

  title: any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchShelterPage');
  }
  

  private datas = [
    {
      title: "강원도 강릉시 강릉대로 587번길 68",
      subTitle: "User Management",
      id: 0
    },
    {
      title: "경상북도 포항시 북구 한동로 558",
      subTitle: "Log Management",
      id: 1
    },
    {
      title: "경상북도 경주시 내남면 부지리 427-1",
      subTitle: "Recieved File Management",
      id: 2
    },
    {
      title: "서울특별시 강서구 방화3동 금낭화로 154",
      subTitle: "Saved File Management",
      id: 3
    },
  ];
  setLocation(data){
    console.log(data.id);
    this.title = this.datas[data.id].title;
    
    this.viewCtrl.dismiss(this.title);
  }

  dismiss(){
    this.viewCtrl.dismiss(this.title);  
  }

  deleteItem(){
    // delete Item
  }
}
