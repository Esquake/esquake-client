import { Component } from '@angular/core';

// Pages
import { HomePage } from '../home/home';
import { EqBehaviorPage } from '../eq-behavior/eq-behavior';
import { SettingPage } from '../setting/setting';
import { EqHistoryPage } from '../eq-history/eq-history';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EqHistoryPage;
  tab3Root = EqBehaviorPage;
  tab4Root = SettingPage;

  constructor() {
  }
}
