import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output
} from "@angular/core";
import { DataService } from "../../services/data.service";
import { ApiResponse, JobDetails, ResultItem } from "../../models/data.model";
import { tap } from "rxjs/operators";
import { config } from "../../config";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild("searchInput", { static: true })
  searchInput: ElementRef;

  @Output()
  jobs: JobDetails[];
  filtered: JobDetails[];
  isFiltered = false;
  breakpoint: number;
  searchBox: string;
  logo = config.logo;
  baseUrl = config.baseUrl;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.searchBox = this.dataService.getSearch();
    this.onSearch();
    this.onResize();
  }

  onResize(event?: Window) {
    this.breakpoint = event
      ? event.innerWidth <= 900 ? 1 : 3
      : window.innerWidth <= 900? 1 : 3;
  }

  onSearch() {
    this.isFiltered = false;
    this.dataService
      .getData(this.baseUrl, this.searchBox)
      .pipe(
        tap((data: ApiResponse) => { 
          this.jobs = data.SearchResult.SearchResultItems.map((job: ResultItem) => job.MatchedObjectDescriptor);
        })).subscribe();

    this.searchInput.nativeElement.blur();
  }

  onFilter(value: string) {
    this.isFiltered = true;
    this.filtered = this.jobs.filter(job =>
      job.PositionTitle.toLowerCase().includes(value.toLowerCase())
    );
  }

  setData(): JobDetails[] {
    return this.isFiltered ? this.filtered : this.jobs;
  }

  clearFilter() {
    this.isFiltered = false;
  }
}
