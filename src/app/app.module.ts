import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { Firebase } from '@ionic-native/firebase';
// import { FCM } from '@ionic-native/fcm';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { FcmProvider } from '../providers/fcm/fcm';

const firebase = {
  // your firebase web config
  apiKey: "AIzaSyB7Qe9SIzfB7tMQOQqAHxE7vgs4LhWVy8U",
  authDomain: "esquake-d87b2.firebaseapp.com",
  databaseURL: "https://esquake-d87b2.firebaseio.com",
  projectId: "esquake-d87b2",
  storageBucket: "esquake-d87b2.appspot.com",
  messagingSenderId: "461474507874"
 }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Firebase,
    FcmProvider,
    Geolocation,
    FcmProvider,
    // FCM,
  ]
})
export class AppModule {}
