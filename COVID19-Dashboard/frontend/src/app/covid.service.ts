import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesTotalResponse } from './countries-total';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  uri = 'http://localhost:4000';
  Emmiter;
  time_interval;
  stationNameSelected = 'None';

  constructor(private http: HttpClient) { }

  getCountriesTotal(): Observable<CountriesTotalResponse> {
    return this.http.get<CountriesTotalResponse>(`${this.uri}/countries-total`);
  }

}
