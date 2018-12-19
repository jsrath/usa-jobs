import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}
  url = 'https://jobs.search.gov/jobs/search.json?query=nursing+jobs+with+veterans+affairs+in+albany+ny';
  getData() {
    return this.http.get(this.url);
  }
}
