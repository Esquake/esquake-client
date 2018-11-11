import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular';

@Injectable()
export class AlertProvider {
  constructor(public toastCtrl: ToastController) {}

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}