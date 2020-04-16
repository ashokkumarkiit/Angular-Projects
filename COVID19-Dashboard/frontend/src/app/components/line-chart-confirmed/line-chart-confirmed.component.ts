import { Component, OnInit, Input, VERSION } from '@angular/core';
import { TimeSeries } from 'src/app/timeseries-data';
import { CovidService } from 'src/app/covid.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-line-chart-confirmed',
  templateUrl: './line-chart-confirmed.component.html',
  styleUrls: ['./line-chart-confirmed.component.css']
})
export class LineChartConfirmedComponent implements OnInit {

    @Input() timeseries_confirmed: TimeSeries[];
  
    constructor(private covidService: CovidService) {
        
    }
  
    ngOnInit() {
    
   }

  ngAfterViewInit() {
    let time_data : string[] = [] ;
    let total_data : number[] = [];
   
     this.timeseries_confirmed.map(row => {
      time_data.push(row.report_date.toString());
      total_data.push(parseInt(row.total.toString()));
    });
    
    var chart = c3.generate({
      data: {
        x: 'x',
        xFormat: '%m-%d-%Y',
        json: JSON.parse(JSON.stringify(this.timeseries_confirmed)),
        names: {
          total: 'Confirmed Cases'
        },
        keys: {
            x: 'report_date',
            value: ['total'],
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
