import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidReportComponent } from './components/covid-report/covid-report.component';
import { WorldMapReportComponent } from './components/world-map-report/world-map-report.component';
import { UsStateReportComponent } from './components/us-state-report/us-state-report.component';

const routes: Routes = [
  { path: 'report', component: CovidReportComponent },
  { path: 'map-report', component: WorldMapReportComponent },
  { path: 'us-report', component: UsStateReportComponent },
  { path: '', redirectTo: '/report', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
