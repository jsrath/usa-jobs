import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';
import { DataService } from '../data.service';
import { JobPost } from '../data.service';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchInput')
  searchInput: ElementRef;

  @Output()
  jobs: any;
  filtered: JobPost[];
  isFiltered = false;
  breakpoint: number;
  logo = 'assets/logo.svg';

  searchBox: string = this.dataService.getSearch();
  baseUrl: string = 'https://data.usajobs.gov/api/Search?PositionTitle=';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.onSearch();
    this.onResize();
  }

  onResize(event?) {
    this.breakpoint = event
    ? event.target.innerWidth <= 900 ? 1 : 3
    : window.innerWidth <= 900 ? 1 : 3;
  }

  onSearch() {
    this.isFiltered = false;
    this.dataService.getData(this.baseUrl, this.searchBox)
    .pipe(tap(data => {
      this.jobs = data.SearchResult.SearchResultItems.map(job => job.MatchedObjectDescriptor)
    })).subscribe();
    
    this.searchInput.nativeElement.blur();
  }

  onFilter(value) {
    this.isFiltered = true;
    this.filtered = this.jobs.filter(job => job.PositionTitle.toLowerCase().includes(value.toLowerCase()));
  }

  setData() {
    return this.isFiltered ? this.filtered : this.jobs;
  }

  clearFilter() {
    this.isFiltered = false;
  }
}
