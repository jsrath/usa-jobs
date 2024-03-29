import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../../services/data.service";
import { ApiResponse, JobDetails, ResultItem } from "../../models/data.model";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.css"]
})
export class JobComponent implements OnInit, AfterViewChecked {
  param: string;
  jobs: JobDetails[];
  dataBackup: Observable<ApiResponse> | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getParam();
    this.dataBackup = this.dataService.getDataBackup();

    this.dataBackup 
    ? this.dataBackup .pipe(
      tap((data: ApiResponse) => { 
        this.jobs = data.SearchResult.SearchResultItems.map((job: ResultItem) => job.MatchedObjectDescriptor);
      })).subscribe()
    : this.jobs = JSON.parse(localStorage.getItem("jobs"))
  }

  ngAfterViewChecked() {
    this.jobs && localStorage.setItem("jobs", JSON.stringify(this.jobs));
  }

  getParam() {
    this.route.params.subscribe((params: Params) => (this.param = params.id));
  }
}
