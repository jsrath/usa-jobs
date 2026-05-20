import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from "../models/data.model";
import { Observable } from 'rxjs';
import { config } from "../config"

@Injectable({
  providedIn: 'root',
})

export class DataService {
  url: string;
  search: string;
  dataBackup: Observable<ApiResponse>;
  resultsPerPage = config.resultsPerPage;
  authKey = config.authKey;
  headers = {
    headers: new HttpHeaders({
      'Authorization-Key': this.authKey,
      Host: 'data.usajobs.gov',
      'User-Agent': 'jeremy@jsrath.com',
    }),
  };

  constructor(private http: HttpClient) { }

  getData(baseUrl, search?): Observable<ApiResponse> {
    this.url = baseUrl;
    const params = [this.resultsPerPage];
    const keyword = search && typeof search === 'string' ? search.trim() : '';

    if (keyword) {
      this.search = keyword;
      params.unshift(`Keyword=${encodeURIComponent(keyword)}`);
    } else {
      this.search = '';
    }

    this.dataBackup = this.http.get<ApiResponse>(`${baseUrl}${params.join('&')}`, this.headers);
    return this.dataBackup;
  }

  getSearch(): string {
    return this.search;
  }

  getDataBackup(): Observable<ApiResponse> | undefined {
    return this.dataBackup;
  }
}
