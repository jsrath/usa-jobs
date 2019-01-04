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
  url: string;
  search: string;
  dataBackup: Observable<JobPost[]>;

  constructor(private http: HttpClient) {}

  getData(baseUrl, search?): Observable<JobPost[]> {
    this.url = baseUrl;
    if (search) {
      this.search = search;
      this.dataBackup = this.http.get<JobPost[]>(`${baseUrl}${search}`);
      return this.http.get<JobPost[]>(`${baseUrl}${search}`);
    } else {
      this.dataBackup = this.http.get<JobPost[]>(`${baseUrl}`);
      return this.http.get<JobPost[]>(`${baseUrl}`);
    }
  }

  getSearch() {
    return this.search;
  }

  getDataBackup(): Observable<JobPost[]> {
    return this.dataBackup;
  }
}
