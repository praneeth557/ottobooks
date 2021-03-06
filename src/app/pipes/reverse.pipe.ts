import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): unknown {
    if(value && value.length) {
      return value.slice().reverse();
    }
    return value;
  }

}
