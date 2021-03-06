import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sessions'
})
export class SessionsPipe implements PipeTransform {

  transform(sessions: any[], field : string): any[] {
    if(!field || field.trim() === '' || !sessions.length) {
      return sessions;
    }

    return sessions.filter(s => s.user_name && field && s.user_name.toLowerCase().indexOf(field.toLowerCase()) > -1);
  }

}
