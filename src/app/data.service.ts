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
  constructor(private http: HttpClient) {}

  getData(baseUrl, search?): Observable<JobPost[]> {
    this.url = baseUrl;
    if (search) {
      this.search = search;
      return this.http.get<JobPost[]>(`${baseUrl}${search}`);
    } else {
      return this.http.get<JobPost[]>(`${baseUrl}`);
    }
  }
  getCurrentUrl() {
    return this.search ? `${this.url}${this.search}` : this.url;
  }
  getSearch() {
    return this.search;
  }
}
