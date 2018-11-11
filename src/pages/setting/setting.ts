import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  minNotification: any = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public AlertProvider:AlertProvider,) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingPage');
  }
  changet() {
    // console.log(this.minNotification);
    this.AlertProvider.presentToast(`${this.minNotification}이상의 지진만 알림받습니다.`)
  }

}
