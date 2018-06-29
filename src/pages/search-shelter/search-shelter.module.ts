import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchShelterPage } from './search-shelter';

@NgModule({
  declarations: [
    SearchShelterPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchShelterPage),
  ],
})
export class SearchShelterPageModule {}
