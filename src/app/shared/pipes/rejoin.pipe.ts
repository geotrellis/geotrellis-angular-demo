import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rejoin'
})
export class RejoinPipe implements PipeTransform {

  transform(value: string, separator: string, join?: string): string {
    if (!join) {
      join = ' ';
    }
    return value.split(separator).join(join);
  }

}
