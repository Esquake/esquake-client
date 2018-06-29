import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EqBehaviorPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
