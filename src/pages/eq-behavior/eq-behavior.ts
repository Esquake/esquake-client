import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';

/**
 * Generated class for the EqBehaviorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eq-behavior',
  templateUrl: 'eq-behavior.html',
})
export class EqBehaviorPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {    
  }

  slides = [
    {
      image: "../../assets/imgs/guide9.png",
    },
    {
      image: "../../assets/imgs/guide10.png",
    },
    {
      image: "../../assets/imgs/guide11.png",
    }
  ];

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EqBehaviorPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  slideChanged(){
  }
}
