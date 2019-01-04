import { Component, OnInit, SimpleChanges, ViewChild, ElementRef, Output, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { JobPost } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Output()
  jobs: JobPost[];
  filtered: JobPost[];

  isFiltered: boolean = false;
  breakpoint: number;
  logo: string = '../assets/logo.svg';

  searchBox: string = this.dataService.getSearch();
  baseUrl: string = 'https://jobs.search.gov/jobs/search.json?size=50&query=';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData(this.baseUrl, this.searchBox).subscribe(data => (this.jobs = data));
    this.breakpoint = window.innerWidth <= 900 ? 1 : 3;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}
  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 900 ? 1 : 3;
  }

  onSearch() {
    this.isFiltered = false;
    this.dataService.getData(this.baseUrl, this.searchBox).subscribe(data => (this.jobs = data));
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
