import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { FcmProvider } from '../providers/fcm/fcm';

import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  lat: number ;
  lon: number ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public fcm: FcmProvider, public toastCtrl: ToastController, public geolocation: Geolocation) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Get a FCM token
      this.fcm.getToken()
      // this.FCM.subscribeToTopic("all")
      // .then(function(response) {
      //   // See the MessagingTopicManagementResponse reference documentation
      //   // for the contents of response.
      //   console.log('Successfully subscribed to topic:', response);
      // })
      // .catch(function(error) {
      //   console.log('Error subscribing to topic:', error);
      // });
      // Listen to incoming messages
      this.fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = this.toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
