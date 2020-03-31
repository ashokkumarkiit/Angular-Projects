import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';



import { MatToolbarModule, MatFormFieldModule,
    MatCheckboxModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule,
    MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule,
    MatGridListModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { AppRoutingModule } from './app-routing.module';
import { CovidReportComponent } from './components/covid-report/covid-report.component';


@NgModule({
  declarations: [
    AppComponent,
    CovidReportComponent,
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
    SatDatepickerModule,
    SatNativeDateModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCIgk-WnRPk3W6SMK7RKFlLvgMDG_WdWPw' + '&libraries=visualization'}),
    FormsModule,
    NgbModule,
    MatCheckboxModule,
    AppRoutingModule

  ],

  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
