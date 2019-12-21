import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../data.service";
import { JobPost } from "../data.service";
import { tap } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.css"]
})
export class JobComponent implements OnInit, AfterViewChecked {
  param: string;
  jobs: any;
  dataBackup: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getParam();
    this.dataBackup = this.dataService.getDataBackup();

    this.dataBackup 
    ? this.dataBackup.pipe(tap(data => this.jobs = data.SearchResult.SearchResultItems)).subscribe()
    : this.jobs = JSON.parse(localStorage.getItem("jobs"))
  }

  ngAfterViewChecked() {
    this.jobs && localStorage.setItem("jobs", JSON.stringify(this.jobs));
  }

  getParam() {
    this.route.params.subscribe((params: Params) => (this.param = params.id));
  }

  parseData(jobs) {
    return this.jobs.map(job => job.MatchedObjectDescriptor);
  }
}
