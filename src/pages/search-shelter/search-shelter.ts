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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
    
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchShelterPage');
  }

  title = "soicem";

  private datas = [
    {
      title: this.title,
      subTitle: "User Management",
      id: 0
    },
    {
      title: "로그 관리",
      subTitle: "Log Management",
      id: 1
    },
    {
      title: "받은 파일 관리",
      subTitle: "Recieved File Management",
      id: 2
    },
    {
      title: "저장된 파일 관리",
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
