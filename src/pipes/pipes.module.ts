import { NgModule } from '@angular/core';
import { DatePipe } from './date/date';
import { DistancePipe } from './distance/distance';
@NgModule({
	declarations: [DatePipe,
    DistancePipe],
	imports: [],
	exports: [DatePipe,
    DistancePipe]
})
export class PipesModule {}
