import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { JobPost } from '../data.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit, OnChanges {
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.route.params.subscribe((params: Params) => {
      this.param = params.id;
    });
  }
  param: string;
  url: string;
  jobs: JobPost[];

  ngOnInit(): void {
    this.dataService.getDataBackup().subscribe(data => (this.jobs = data));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.jobs);
  }

  /*   ngAfterViewInit() {
    this.jobs && localStorage.setItem('jobs', JSON.stringify(this.jobs));
    if (!this.jobs) {
      this.jobs = JSON.parse(localStorage.getItem('jobs'));
    }
  } */
}
