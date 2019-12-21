import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobPost {
  /*   id: string;
    position_title: string;
    organization_name: string;
    rate_interval_code: string;
    minimum: number;
    maximum: number;
    start_date: string;
    end_date: string;
    locations: string[];
    url: string; */
  searchResult: object;
}

@Injectable({
  providedIn: 'root',
})

export class DataService {
  url: string;
  search: string;
  dataBackup: Observable<any>;
  resultsPerPage = 'ResultsPerPage=48'
  authKey = 'ZVRFnMsfJGJ+6jvGyznqQPRyhF9n5h9jSS259lekdgU=';
  headers = { headers: new HttpHeaders({ 'Authorization-Key': this.authKey }) }

  constructor(private http: HttpClient) { }

  getData(baseUrl, search?): Observable<any> {
    this.url = baseUrl;
    if (search) {
      this.search = search;
      this.dataBackup = this.http.get<any>(`${baseUrl}${search}&${this.resultsPerPage}`, this.headers);
    } else {
      this.dataBackup = this.http.get<any>(`${baseUrl}&${this.resultsPerPage}`, this.headers);
    }
    return this.dataBackup;
  }

  getSearch() {
    return this.search;
  }

  getDataBackup(): Observable<any> | undefined {
    return this.dataBackup;
  }
}
