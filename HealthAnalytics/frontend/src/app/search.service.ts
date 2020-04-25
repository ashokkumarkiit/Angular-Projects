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
export class SearchService {

  uri = 'http://localhost:4000';
  Emmiter;
  time_interval;
  stationNameSelected = 'None';

  latitude: Number = 0.0;
  longitude: Number = 0.0;

  constructor(private http: HttpClient) { }

  getFitnessByLocation(lat,lng, rad): Observable<FitnessResponse> {
    return this.http.get<FitnessResponse>(`${this.uri}/search/fitness/${lat}/${lng}/${rad}`);
  }

  getCurrentLocation():Observable<Position> {
    return Observable.create(observer => {
      this.Emmiter = observer;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // this.showPosition(position);
          console.log("position", position);
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude
          observer.next({position});
          observer.complete();
        });
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}