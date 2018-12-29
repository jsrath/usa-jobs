import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobPost {
  id: string;
  position_title: string;
  organization_name: string;
  rate_interval_code: string;
  minimum: number;
  maximum: number;
  start_date: string;
  end_date: string;
  locations: string[];
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(url): Observable<JobPost[]> {
    return this.http.get<JobPost[]>(url);
  }
}
