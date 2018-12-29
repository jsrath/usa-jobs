import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Output } from '@angular/core';
import { DataService } from './data.service';
import { JobPost } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Output()
  jobs: JobPost[];
  filtered: JobPost[];

  isFiltered: boolean = false;
  breakpoint: number;
  logo: string = '../assets/logo.svg';

  searchBox: string;
  url: string = 'https://jobs.search.gov/jobs/search.json?size=50&query=';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData(`${this.url} `).subscribe(
      data => (this.jobs = data),
      (error: Response) => {
        alert('An error occured, please try again.');
        console.log(error.status);
      },
    );
    this.breakpoint = window.innerWidth <= 900 ? 1 : 3;
  }

  ngOnChanges(changes: SimpleChanges): void {}
  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 900 ? 1 : 3;
  }

  onSearch() {
    this.isFiltered = false;
    this.dataService.getData(`${this.url}${this.searchBox}`).subscribe(data => (this.jobs = data));
    this.searchBox = '';
    this.searchInput.nativeElement.blur();
  }

  onFilter(value) {
    this.isFiltered = true;
    this.filtered = this.jobs.filter(job => job.position_title.toLowerCase().includes(value.toLowerCase()));
  }

  setData() {
    return this.isFiltered ? this.filtered : this.jobs;
  }
  clearFilter() {
    return (this.isFiltered = false);
  }
}
