import { Component, OnInit, SimpleChanges, ViewChild, ElementRef, Output } from '@angular/core';
import { DataService } from '../data.service';
import { JobPost } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Output()
  jobs: JobPost[];
  filtered: JobPost[];

  isFiltered: boolean = false;
  breakpoint: number;
  logo: string = '../assets/logo.svg';

  searchBox: string = '';
  baseUrl: string = 'https://jobs.search.gov/jobs/search.json?size=50&query=';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log(this.searchBox);
    this.dataService.getData(`${this.baseUrl}${this.searchBox}`).subscribe(data => (this.jobs = data));
    this.breakpoint = window.innerWidth <= 900 ? 1 : 3;
  }

  ngOnChanges(changes: SimpleChanges): void {}
  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 900 ? 1 : 3;
  }

  onSearch() {
    console.log(this.searchBox);
    this.isFiltered = false;
    this.dataService.getData(`${this.baseUrl}${this.searchBox}`).subscribe(data => (this.jobs = data));
    this.searchInput.nativeElement.blur();
  }

  onFilter(value) {
    console.log(this.searchBox);
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
