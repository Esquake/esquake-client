import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DistancePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'DistancePipe',
})
export class DistancePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {

    
    return parseInt(value)
  }
}
