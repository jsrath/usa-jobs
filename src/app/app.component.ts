import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
})
export class AppComponent {
  title;
  jobs;
  data = {
    title: 'Money Man',
    age: 42,
    gender: 'male',
  };

  constructor(private dataService: DataService) {}

  getValues() {}

  showData() {
    this.dataService.getData().subscribe(
      data => {
        this.jobs = data[0];
      },
      () => console.log(this.jobs),
    );
  }

  getTitle() {
    return (this.title = 'USA Jobs');
  }
}
