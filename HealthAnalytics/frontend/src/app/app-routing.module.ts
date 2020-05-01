import { CovidPredictionComponent } from './components/covid-prediction/covid-prediction.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './components/workout/workout.component';
import { SearchComponent } from './components/search/search.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ExerciseDetailComponent } from './components/exercise-detail/exercise-detail.component';
import { HealthAnalyticsComponent } from './components/health-analytics/health-analytics.component';


const routes: Routes = [
  { path: 'workout', component: WorkoutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'analytics', component: HealthAnalyticsComponent },
  { path: 'exercises/:id', component: ExercisesComponent },
  { path: 'exercise/detail/:id', component: ExerciseDetailComponent },
  { path: 'covid-prediction', component: CovidPredictionComponent},
  { path: '', redirectTo: '/analytics', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
