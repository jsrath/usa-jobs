import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(title: string, args?: any): string {
    if (title.length > 50) {
      title = title.substring(0, 50);
      return title.substring(0, title.lastIndexOf(' '));
    }
    return title;
  }
}
