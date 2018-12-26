import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from './data.service';
import { JobPost } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  breakpoint: number;
  logo: string = '../assets/logo.svg';
  jobs: JobPost[];
  searchBox: string;
  url: string = 'https://jobs.search.gov/jobs/search.json?size=50&query=';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData(`${this.url} `).subscribe(data => (this.jobs = data));
    this.breakpoint = window.innerWidth <= 900 ? 1 : 3;
  }

  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 900 ? 1 : 3;
  }

  onSearch() {
    this.dataService.getData(`${this.url}${this.searchBox}`).subscribe(data => (this.jobs = data));
    this.searchBox = '';
    this.searchInput.nativeElement.blur();
  }
}
