import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(obj: object): string[] {
    return Object.keys(obj);
  }
}
