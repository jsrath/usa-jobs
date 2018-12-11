import { Component } from '@angular/core';
//import { DataService } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title;
  data = {
    title: 'Money Man',
    age: 42,
    gender: 'male',
  };

  getTitle() {
    return (this.title = 'USA Jobs');
  }
}
