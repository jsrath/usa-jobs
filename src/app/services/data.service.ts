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
  headers = { headers: new HttpHeaders({ 'Authorization-Key': this.authKey }) }

  constructor(private http: HttpClient) { }

  getData(baseUrl, search?): Observable<ApiResponse> {
    this.url = baseUrl;
    if (search !== undefined) {
      this.search = search;
      this.dataBackup = this.http.get<ApiResponse>(`${baseUrl}${search}&${this.resultsPerPage}`, this.headers);
    } else {
      this.dataBackup = this.http.get<ApiResponse>(`${baseUrl}&${this.resultsPerPage}`, this.headers);
    }
    return this.dataBackup;
  }

  getSearch(): string {
    return this.search;
  }

  getDataBackup(): Observable<ApiResponse> | undefined {
    return this.dataBackup;
  }
}
