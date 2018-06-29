import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, src: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public modalCtrl:ModalController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '지진기록', component: HomePage, src:"/../assets/icon/ic_eq_history.png"},
      { title: '지진행동지침', component: ListPage, src:"/../assets/icon/ic_survival-book.png"}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    let profileModal;
  
    if("지진기록" == page.title){
      profileModal = this.modalCtrl.create("EqHistoryPage");
    } else if("지진행동지침" == page.title){
      profileModal = this.modalCtrl.create("EqBehaviorPage");
    }
    profileModal.onDidDismiss(data =>{
      console.log("data");
    });
    profileModal.present();
  }
}
