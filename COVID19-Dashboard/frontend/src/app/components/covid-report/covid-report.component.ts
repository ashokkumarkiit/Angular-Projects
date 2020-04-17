import { TimeSeries } from './../../timeseries-data';
import { interval } from 'rxjs'
import { Component, OnInit } from '@angular/core';
import { CovidService } from './../../covid.service';
import { CountriesTotal } from 'src/app/countries-total';
import { WorldTotal } from 'src/app/world-total';
import { TimeSeriesDRContainer, TimeSeriesDRCombined } from 'src/app/timeseries-deaths-recovered-data';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  desc: string;
}

@Component({
  selector: 'app-covid-report',
  templateUrl: './covid-report.component.html',
  styleUrls: ['./covid-report.component.css']
})
export class CovidReportComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'total-confirmed', cols: 2, rows: 1, color: 'white', desc: 'Total Confirmed'},
    {text: 'timeseries-confirmed', cols: 6, rows: 3, color: 'white', desc: 'Timeseries-Confirmed'},
    {text: 'total-country-deaths', cols: 2, rows: 6, color: 'white', desc: 'Total Deaths'},
    {text: 'total-country-recovered', cols: 2, rows: 6, color: 'white', desc: 'Total Recovered'},
    {text: 'total-country-confirmed', cols: 2, rows: 5, color: 'white', desc: 'Confirmed Cases by Country/Region'},
    {text: 'timeseries-dr', cols: 6, rows: 3, color: 'white', desc: 'Timeseries Deaths & Recovered'},
  ];

  countries_total_confirmed: CountriesTotal[];
  isCountriesTotalConfirmedLoading:Boolean =  false;
  countries_total_deaths: CountriesTotal[];
  isCountriesTotalDeathsLoading:Boolean =  false;
  countries_total_recovered: CountriesTotal[];
  isCountriesTotalRecoveredLoading:Boolean =  false;
  world_total: WorldTotal[];
  isWorldTotalLoading:Boolean = false;
  timeSeries_confirmed_data: TimeSeries[];
  isTimeSeriesConfirmedDataLoading: Boolean = false;
  timeSeries_dr_data: TimeSeriesDRContainer;
  isTimeSeriesDRDataLoading: Boolean = false;
  timeseries_dr_combined_data: TimeSeriesDRCombined[];
  obj_death_recovered = []; 


  constructor(private covidService: CovidService) { }

  ngOnInit() {
    // Initialization Logic

    this.loadWebsiteData();
    
    interval(60* 1000).subscribe(() => {
      this.loadWebsiteData();
    })
  }

  loadWebsiteData() {
    this.getCountriesTotalConfirmed();
    this.getCountriesTotalDeaths();
    this.getCountriesTotalRecovered();
    this.getWorldTotal();
    this.getTimeSeriesConfirmed();
    this.getTimeSeriesDeathsRecovered();
  }

  getCountriesTotalConfirmed(): void {
    this.isCountriesTotalConfirmedLoading = true;
    this.covidService.getCountriesTotalConfirmed().subscribe(
      res => {
        this.countries_total_confirmed = res.countries_total;
        this.isCountriesTotalConfirmedLoading = false;
      }
    );
  }

  getCountriesTotalDeaths(): void {
    this.isCountriesTotalDeathsLoading = true;
    this.covidService.getCountriesTotalDeaths().subscribe(
      res => {
        this.countries_total_deaths = res.countries_total;
        this.isCountriesTotalDeathsLoading = false;
      }
    );
  }

  getCountriesTotalRecovered(): void {
    this.isCountriesTotalRecoveredLoading = true;
    this.covidService.getCountriesTotalRecovered().subscribe(
      res => {
        this.countries_total_recovered = res.countries_total; 
        this.isCountriesTotalRecoveredLoading = false;
      }
    );
  }

  getWorldTotal(): void {
    this.isWorldTotalLoading = true;
    this.covidService.getWorldTotal().subscribe(
      res => {
        this.world_total = res.world_total;
        this.isWorldTotalLoading = false;
      }
    );
  }

  getTimeSeriesConfirmed(): void {
    this.isTimeSeriesConfirmedDataLoading = true;
    this.covidService.getTimeSeriesConfirmed().subscribe(
      res => {
        this.isTimeSeriesConfirmedDataLoading = false;
        this.timeSeries_confirmed_data = res.timeseries_data;
      }
    );
  } 
  
  getTimeSeriesDeathsRecovered(): void {
    this.isTimeSeriesDRDataLoading = true;
    this.covidService.getTimeSeriesDeathsRecovered().subscribe(
      res => {
        this.isTimeSeriesDRDataLoading = false;
        this.timeSeries_dr_data = res.timeseries_data;
        this.generateCombinedRecordForTimeseriesDR();
      }
    );
  }

  generateCombinedRecordForTimeseriesDR() {
    let kvData = new Map;
    this.timeSeries_dr_data.deaths.forEach(element => {
      let data = {
        report_date: element.report_date,
        total_deaths: element.total,
        total_recovered: 0
      }
      kvData.set(element.report_date,data);
    });

    this.timeSeries_dr_data.recovered.forEach(element => {

      let prevData = kvData.get(element.report_date);
      let new_data = {
        report_date: prevData.report_date,
        total_deaths: prevData.total_deaths,
        total_recovered: element.total
      }
      kvData.set(element.report_date,new_data);
    });

    // console.log(kvData);
    

    this.timeSeries_dr_data.recovered.forEach(element => {
      this.obj_death_recovered.push(kvData.get(element.report_date));
    });
  
    // console.log(this.obj_death_recovered);
  }

}
