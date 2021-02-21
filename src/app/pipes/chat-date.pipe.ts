import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: Date, ...args: unknown[]): unknown {
    let today = new Date();
    let current = new Date(value + " UTC");

    let todayTime = today.getTime();
    let currentTime = current.getTime();
    let diffDays = (todayTime - currentTime)/(24*60*60*1000);

    if(today.getFullYear() == current.getFullYear() && today.getMonth() == current.getMonth() && diffDays < 1) {
      return this.datePipe.transform(current, 'h:mm a')
    };

    if(diffDays >= 1 && diffDays < 7) {
      return Math.floor(diffDays) + 'D';
    }

    return this.datePipe.transform(current, 'M/d/yy');
  }

}
