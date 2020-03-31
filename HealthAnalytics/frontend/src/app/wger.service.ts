import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';



import { Observable, of } from 'rxjs';
import { ExerciseCategoryResponse } from './exercise-category';
import { ExerciseResponse } from './exercise';
import { ExerciseMuscleResponse } from './exercise-muscle';
import { ExerciseEquipmentResponse } from './exercise-equipment';
import { ExerciseDetailResponse } from './exercise-detail';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class WgerService {

  uri = 'http://localhost:4000';
  Emmiter;
  time_interval;
  stationNameSelected = 'None';

  constructor(private http: HttpClient) { }

  getExerciseCategory(): Observable<ExerciseCategoryResponse> {
    return this.http.get<ExerciseCategoryResponse>(`${this.uri}/exercise/category`);
  }

  getExerciseByCategory(id): Observable<ExerciseResponse> {
    return this.http.get<ExerciseResponse>(`${this.uri}/exercises/${id}`);
  }

  getExerciseDetail(id): Observable<ExerciseDetailResponse> {
    return this.http.get<ExerciseDetailResponse>(`${this.uri}/exercise/detail/${id}`);
  }

  getExerciseMuscles(id): Observable<ExerciseMuscleResponse> {
    return this.http.get<ExerciseMuscleResponse>(`${this.uri}/exercise/muscle/${id}`);
  }

  getExerciseEquipments(id): Observable<ExerciseEquipmentResponse> {
    return this.http.get<ExerciseEquipmentResponse>(`${this.uri}/exercise/equipment/${id}`);
  }

}
