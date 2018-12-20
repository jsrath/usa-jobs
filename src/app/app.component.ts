import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
})
export class AppComponent {
  title;
  jobs;
  myBool: boolean = true;
  searchBox: string;
  data = {
    title: 'Money Man',
    age: 42,
    gender: 'male',
  };

  constructor(private dataService: DataService) {}

  getValues() {}

  showData(): void {
    this.dataService.getData().subscribe(data => {
      return (this.jobs = data);
    });
  }

  getTitle(): string {
    return (this.title = 'USA Jobs');
  }

  hideStuff(): void {
    this.myBool = !this.myBool;
  }
}
