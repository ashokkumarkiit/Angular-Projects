import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesTotalResponse } from './countries-total';
import { WorldTotalResponse } from './world-total';
import { MapDataResponse } from './map-data';
import { TimeSeriesResponse } from './timeseries-data';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  uri = 'http://localhost:4000';
  Emmiter;
  time_interval;
  stationNameSelected = 'None';

  constructor(private http: HttpClient) { }

  getCountriesTotalConfirmed(): Observable<CountriesTotalResponse> {
    return this.http.get<CountriesTotalResponse>(`${this.uri}/countries-total/confirmed`);
  }

  getCountriesTotalDeaths(): Observable<CountriesTotalResponse> {
    return this.http.get<CountriesTotalResponse>(`${this.uri}/countries-total/deaths`);
  }

  getCountriesTotalRecovered(): Observable<CountriesTotalResponse> {
    return this.http.get<CountriesTotalResponse>(`${this.uri}/countries-total/recovered`);
  }

  getWorldTotal(): Observable<WorldTotalResponse> {
    return this.http.get<WorldTotalResponse>(`${this.uri}/world-total`);
  }

  getWorldLocations(): Observable<MapDataResponse> {
    return this.http.get<MapDataResponse>(`${this.uri}/world-locations`);
  }

  getTimeSeriesConfirmed(): Observable<TimeSeriesResponse> {
    return this.http.get<TimeSeriesResponse>(`${this.uri}/timeseries-confirmed`);
  }

}
