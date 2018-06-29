import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EqHistoryPage } from './eq-history';

@NgModule({
  declarations: [
    EqHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EqHistoryPage),
  ],
})
export class EqHistoryPageModule {}
