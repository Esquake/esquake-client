import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'DatePipe',
})
export class DatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(date: string) {
    // console.log(date.length);
    if (date.length == 14) {
      return `${date.slice(2,4)}/${date.slice(4,6)}/${date.slice(6,8)} ${date.slice(8,10)}:${date.slice(10,12)}:${date.slice(12,)}`;
    }
    else {
      return date;
    }
    // ex) 20181102071951
    // console.log(date.slice(0,4))
    // console.log(date.slice(4,6))
    // console.log(date.slice(6,8))
    // console.log(date.slice(8,10))
    // console.log(date.slice(10,12))
    // console.log(date.slice(12,))
    
  }
}
