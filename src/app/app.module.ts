import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EqBehaviorPage } from '../pages/eq-behavior/eq-behavior';
import { EqHistoryPage } from '../pages/eq-history/eq-history';
import { SettingPage } from '../pages/setting/setting';
import { ListPage } from '../pages/list/list';
import { EqDetailPage } from '../pages/eq-detail/eq-detail';
import { FindShelterPage } from '../pages/find-shelter/find-shelter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseKey } from '../key/firebaseKey';

import { GoogleMapComponent } from '../components/google-map/google-map'
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { PipesModule } from '../pipes/pipes.module';
import { AlertProvider } from '../providers/alert/alert';

export const firebaseConfig = {
  apiKey: firebaseKey['apiKey'],
  authDomain: firebaseKey['authDomain'],
  databaseURL: firebaseKey['databaseURL'],
  projectId: firebaseKey['projectId'],
  storageBucket: firebaseKey['storageBucket'],
  messagingSenderId: firebaseKey['messagingSenderId']
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    EqBehaviorPage,
    EqHistoryPage,
    EqDetailPage,
    FindShelterPage,
    SettingPage,
    ListPage,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'md',
      menuType: 'overlay',
      statusbarPadding: false,
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    PipesModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    EqBehaviorPage,
    EqHistoryPage,
    EqDetailPage,
    FindShelterPage,
    SettingPage,
    ListPage,
    GoogleMapComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OneSignal,
    NativeGeocoder,
    Geolocation,
    AlertProvider
  ]
})
export class AppModule {}
