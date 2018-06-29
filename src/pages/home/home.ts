import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl : ModalController) {
    this.initPage();
  }
  private title :any;

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
}
