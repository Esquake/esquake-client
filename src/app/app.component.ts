import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { OneSignal as OneSignalNative } from '@ionic-native/onesignal';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private oneSignalNative: OneSignalNative) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = HomePage;

      if (platform.is('cordova')) {
        if(!platform.is('ios')) statusBar.overlaysWebView(false);
        this.oneSignalNative.startInit('21519cdf-0edf-4a14-a8e8-03d3fed6116b', '461474507874');
        this.oneSignalNative.enableVibrate(true);
        this.oneSignalNative.enableSound(true);
        this.oneSignalNative.inFocusDisplaying(this.oneSignalNative.OSInFocusDisplayOption.None);
        this.oneSignalNative.endInit();
      }
    });
  }
}
