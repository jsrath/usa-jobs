import { Component, OnInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { JobPost } from '../data.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit, OnChanges, AfterViewChecked {
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.route.params.subscribe((params: Params) => {
      this.param = params.id;
    });
  }
  param: string;
  url: string;
  jobs: JobPost[];

  ngOnInit(): void {
    if (this.dataService.getDataBackup()) {
      this.dataService.getDataBackup().subscribe(data => (this.jobs = data));
    } else {
      this.jobs = JSON.parse(localStorage.getItem('jobs'));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.jobs);
  }

  ngAfterViewChecked() {
    this.jobs && localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }
}
