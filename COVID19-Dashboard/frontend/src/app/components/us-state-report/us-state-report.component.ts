import { USDaily } from './../../us-daily-report';
import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/covid.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-us-state-report',
  templateUrl: './us-state-report.component.html',
  styleUrls: ['./us-state-report.component.css']
})
export class UsStateReportComponent implements OnInit {

  us_data: USDaily[];

  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.getUSDailyReport();
  }

  plotStackedBarChart() {
    var chart = c3.generate({
      bindto: '#chart_us',
      data: {
        x: 'province_state',
        // xFormat: '%m-%d-%Y', // '%Y%m%d',
        json: JSON.parse(JSON.stringify(this.us_data)),
        names: {
          confirmed: 'Confirmed',
          deaths: 'Deaths',
          recovered: 'Recovered'
        },
        keys: {
            x: 'province_state', // it's possible to specify 'x' when category axis
            value: ['confirmed','deaths', 'recovered'],
        },
        type: 'bar',
        groups: [
          ['confirmed','deaths', 'recovered']
        ]
      },
      axis: {
        x: {
            type: 'category',
            tick: {
              rotate: -60,
              multiline: false
          },
          height: 130
        }
      }
    });
  }

  getUSDailyReport(): void {
    this.covidService.getUSDailyReport().subscribe(
      res => {
        this.us_data = res.us_state_daily_report;
        console.log(this.us_data);
        console.log(JSON.parse(JSON.stringify(this.us_data)))
        this.plotStackedBarChart();
      }
    );
  }

}
