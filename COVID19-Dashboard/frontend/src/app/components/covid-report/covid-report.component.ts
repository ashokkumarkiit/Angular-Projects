import { Component, OnInit } from '@angular/core';
import { CovidService } from './../../covid.service';
import { CountriesTotal } from 'src/app/countries-total';
import { WorldTotal } from 'src/app/world-total';
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
    {text: 'total-confirmed', cols: 2, rows: 1, color: 'lightblue', desc: 'Total Confirmed'},
    {text: 'Two', cols: 6, rows: 6, color: 'lightgreen', desc: 'Map'},
    {text: 'total-country-deaths', cols: 2, rows: 3, color: 'white', desc: 'Total Deaths'},
    {text: 'total-country-recovered', cols: 2, rows: 3, color: 'white', desc: 'Total Recovered'},
    {text: 'total-country-confirmed', cols: 2, rows: 5, color: 'white', desc: 'Confirmed Cases by Country/Region'},
    {text: 'Six', cols: 4, rows: 3, color: 'lightgreen', desc: 'Graph'},
  ];

  countries_total: CountriesTotal[];
  world_total: WorldTotal[];

  constructor(private covidService: CovidService) { }

  ngOnInit() {
    // Initialization Logic
    this.getCountriesTotal();
    this.getWorldTotal();
  }

  getCountriesTotal(): void {
    this.covidService.getCountriesTotal().subscribe(
      res => this.countries_total = res.countries_total
    );
  }

  getWorldTotal(): void {
    this.covidService.getWorldTotal().subscribe(
      res => this.world_total = res.world_total
    );
  }

}
