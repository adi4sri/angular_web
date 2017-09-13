import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mydatepipe',
    pure: false
})
export class MyDatePipe implements PipeTransform {
  transform(items: any[], filter: any[]): any {
     let [minAge, maxAge] = filter;
      return items.filter(item => {
        return item.tip_time >= minAge && item.tip_time <= maxAge;
      });
  }
}