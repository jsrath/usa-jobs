import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { JobPost } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  breakpoint: number;
  jobs: JobPost[];
  searchBox: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => (this.jobs = data));
    this.breakpoint = window.innerWidth <= 900 ? 1 : 3;
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 900 ? 1 : 3;
  }

}
