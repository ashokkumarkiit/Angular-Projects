import { Component, OnInit, Input } from '@angular/core';
import { CovidService } from 'src/app/covid.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-line-chart-deaths-recovered',
  templateUrl: './line-chart-deaths-recovered.component.html',
  styleUrls: ['./line-chart-deaths-recovered.component.css']
})
export class LineChartDeathsRecoveredComponent implements OnInit {

  @Input()timeseries_dr: [];

  constructor() { }

  ngOnInit() {
    console.log(this.timeseries_dr)
  }

  ngAfterViewInit() {
    var chart = c3.generate({
      bindto: '#chart1',
      data: {
        x: 'x',
        xFormat: '%m-%d-%Y', // '%Y%m%d',
        json: JSON.parse(JSON.stringify(this.timeseries_dr)),
        names: {
          total_deaths: 'Deaths',
          total_recovered: 'Recovered'
        },
        keys: {
            x: 'report_date', // it's possible to specify 'x' when category axis
            value: ['total_deaths','total_recovered'],
        }
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                 format: '%m-%d'
            }
        }
      } 
    });
  }

}
