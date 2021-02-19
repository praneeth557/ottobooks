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
    if(today.getFullYear() == current.getFullYear() && today.getMonth() == current.getMonth() && today.getDate() == current.getDate()) {
      return this.datePipe.transform(current, 'h:mm a')
    };

    let todayTime = today.getTime();
    let currentTime = current.getTime();
    let diffDays = (todayTime - currentTime)/(24*60*60*1000);
    if(diffDays >= 1 && diffDays < 7) {
      return Math.floor(diffDays) + ' D';
    }

    return this.datePipe.transform(current, 'M/d/yy');
  }

}
