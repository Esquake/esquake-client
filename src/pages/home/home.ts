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


  initPage(){
    console.log("init page");
  }
  showModal(){
    let profileModal = this.modalCtrl.create("SearchShelterPage");
    console.log("soicem");
    profileModal.onDidDismiss(data => {
      console.log("data");
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
