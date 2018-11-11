import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-eq-history',
  templateUrl: 'eq-history.html',
})
export class EqHistoryPage {

  history: Observable<any[]>;
  earthquake: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController, public afs: AngularFirestore
  ) {
    this.afs.collection('earthquake', ref => ref.orderBy('tmEqk', 'desc')).valueChanges().subscribe(data => {
      // console.log(data);
      this.earthquake = data ;
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EqHistoryPage');
  }
  
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
