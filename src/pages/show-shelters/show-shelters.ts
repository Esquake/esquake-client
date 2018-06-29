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
    console.log("modal page");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowSheltersPage');
  }
  
  private datas = [
    {
      title: "사용자 관리",
      subTitle: "User Management",
      id: "001"
    },
    {
      title: "로그 관리",
      subTitle: "Log Management",
      id: "002"
    },
    {
      title: "받은 파일 관리",
      subTitle: "Recieved File Management",
      id: "003"
    },
    {
      title: "저장된 파일 관리",
      subTitle: "Saved File Management",
      id: "004"
    },
  ];
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
