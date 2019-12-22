import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "title"
})
export class TitlePipe implements PipeTransform {
  transform(title: string): string {
    return title.length > 50
      ? title.substring(0, title.slice(0, 50).lastIndexOf(" "))
      : title;
  }
}
