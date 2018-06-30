import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ShowSheltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-shelters',
  templateUrl: 'show-shelters.html',
})
export class ShowSheltersPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    navParams.get("data");
    this.shelter = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSheltersPage');
  }
  
  private shelter : any;
  private datas = [
    {
      schoolName: "사용자 관리",
      capacity: 5,
      address: "강원도 강릉시 강릉대로587번길 68 Style",
      phone : "033-640-5527",
      id: "001"
    },
    {
      schoolName: "로그 관리",
      capacity: 5,
      address: "강원도 강릉시 강릉대로587번길 68 Style",
      phone : "033-640-5527",
      id: "002"
    },
    {
      schoolName: "받은 파일 관리",
      capacity: 5,
      address: "강원도 강릉시 강릉대로587번길 68 Style",
      phone : "033-640-5527",
      id: "003"
    },
    {
      schoolName: "저장된 파일 관리",
      capacity: 5,
      address: "강원도 강릉시 강릉대로587번길 68 Style",
      phone : "033-640-5527",
      id: "004"
    },
  ];
  dismiss(){
    this.viewCtrl.dismiss();
  }

  findPath(){
    console.log("path find");
  }
}
