import { Component, OnInit } from '@angular/core';
import { CovidService } from './../../covid.service';
import { CountriesTotal } from 'src/app/countries-total';

@Component({
  selector: 'app-covid-report',
  templateUrl: './covid-report.component.html',
  styleUrls: ['./covid-report.component.css']
})
export class CovidReportComponent implements OnInit {

  countries_total: CountriesTotal[];

  constructor(private covidService: CovidService) { }

  ngOnInit() {
    // Initialization Logic
    this.getCountriesTotal();
  }

  getCountriesTotal(): void {
    this.covidService.getCountriesTotal().subscribe(
      res => this.countries_total = res.countries_total
    );
  }

}
