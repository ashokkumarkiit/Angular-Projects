import { DDLSelectResponse } from './analytics-select';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';



import { Observable, of } from 'rxjs';
import { FitnessResponse } from './fitness';
import { MapRecords } from './maps-record';
import { AnalyticsBarchartResponse } from './analytics-bar-chart';
import { CovidDataResponse } from './covid-prediction-data';


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

  getMapData(cat,year,type,subtype): Observable<MapRecords> {
    return this.http.get<MapRecords>(`${this.uri}/analytics/mapdata`,{
      params:{
        cat,
        year,
        type,
        subtype
        }
    });
  }

  getAnalyticsBarChart(cat,year,type,subtype): Observable<AnalyticsBarchartResponse> {
    return this.http.get<AnalyticsBarchartResponse>(`${this.uri}/analytics/barchart`,{
      params:{
        cat,
        year,
        type,
        subtype
        }
    });
  }

  getCovidPredictionData(): Observable<CovidDataResponse> {
    return this.http.get<CovidDataResponse>(`${this.uri}/analytics/covid/prediction`);
  }



}