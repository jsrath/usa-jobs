import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: Http) {}
  url = 'https://jobs.search.gov/jobs/search.json?query=nursing+jobs+with+veterans+affairs+in+albany+ny';
  getData(): Observable<any> {
    return this.http.get(this.url).map((response: Response) => {
      return response.json();
    });
  }
}
