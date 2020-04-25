import { DDLSelectResponse } from './analytics-select';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';



import { Observable, of } from 'rxjs';
import { FitnessResponse } from './fitness';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class NpoService {

  uri = 'http://localhost:4000';
  Emmiter;
  time_interval;
  stationNameSelected = 'None';

  latitude: Number = 0.0;
  longitude: Number = 0.0;

  constructor(private http: HttpClient) { }

  getCategory(): Observable<DDLSelectResponse> {
    return this.http.get<DDLSelectResponse>(`${this.uri}/analytics/category`);
  }

  getYear(): Observable<DDLSelectResponse> {
    return this.http.get<DDLSelectResponse>(`${this.uri}/analytics/year`);
  }

  getSubView(type): Observable<DDLSelectResponse> {
    return this.http.get<DDLSelectResponse>(`${this.uri}/analytics/subview/${type}`);
  }

}