import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
    this.url = this.dataService.getCurrentUrl();
    this.dataService.getData(`${this.url} `).subscribe(data => (this.jobs = data));
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
