import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsBarchart } from 'src/app/analytics-bar-chart';
import * as c3 from 'c3';

@Component({
  selector: 'app-barchart-analytics',
  templateUrl: './barchart-analytics.component.html',
  styleUrls: ['./barchart-analytics.component.css']
})
export class BarchartAnalyticsComponent implements OnInit {

  @Input() barchart_data: AnalyticsBarchart[];

  constructor() { }

  ngOnInit() {
    this.generateBarChart();
  }

  generateBarChart() {
    if (document.getElementById('chart').innerHTML != null) {
      document.getElementById('chart').innerHTML = '';
    }
    const chart = c3.generate({
      bindto: '#chart',
      data: {
          type: 'bar',
          json: JSON.parse(JSON.stringify(this.barchart_data)),

          keys: {
              x: 'location',
              value: ['data_value']
          }
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
      },
      bar: {
          width: {
              ratio: 0.5
          }
      }
  });
  }
}
