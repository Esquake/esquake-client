import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EqDetailPage } from './eq-detail';

@NgModule({
  declarations: [
    EqDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EqDetailPage),
  ],
})
export class EqDetailPageModule {}
