import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';



import { MatToolbarModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule,
    MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule,
    MatGridListModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CovidReportComponent } from './components/covid-report/covid-report.component';
import { TotalConfirmedComponent } from './components/total-confirmed/total-confirmed.component';
import { TotalCountryConfirmedComponent } from './components/total-country-confirmed/total-country-confirmed.component';
import { TotalCountryDeathsComponent } from './components/total-country-deaths/total-country-deaths.component';
import { TotalCountryRecoveredComponent } from './components/total-country-recovered/total-country-recovered.component';
import { WorldMapReportComponent } from './components/world-map-report/world-map-report.component';
import { LineChartConfirmedComponent } from './components/line-chart-confirmed/line-chart-confirmed.component';
import { LineChartDeathsRecoveredComponent } from './components/line-chart-deaths-recovered/line-chart-deaths-recovered.component';
import { UsStateReportComponent } from './components/us-state-report/us-state-report.component';


@NgModule({
  declarations: [
    AppComponent,
    CovidReportComponent,
    TotalConfirmedComponent,
    TotalCountryConfirmedComponent,
    TotalCountryDeathsComponent,
    TotalCountryRecoveredComponent,
    WorldMapReportComponent,
    LineChartConfirmedComponent,
    LineChartDeathsRecoveredComponent,
    UsStateReportComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    NgbModule,
    MatCheckboxModule,
    AppRoutingModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
