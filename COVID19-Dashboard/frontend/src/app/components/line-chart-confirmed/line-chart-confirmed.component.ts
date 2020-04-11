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
  
   ///////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////
  
    constructor(private covidService: CovidService) {
        
    }
  
  
   ///////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////////////////////////////////////
  
  
    ngOnInit() {
    
   }

  ngAfterViewInit() {
    /* let chart = c3.generate({
    bindto: '#chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }
    }); */
    let time_data : string[] = [] ;
    let total_data : number[] = [];
    // let label_data = ['data1']
   
     this.timeseries_confirmed.map(row => {
      time_data.push(row.report_date.toString());
      total_data.push(parseInt(row.total.toString()));
    });

    console.log(time_data);
    console.log(total_data);
    
    var chart = c3.generate({
      data: {
        x: 'x',
        xFormat: '%m-%d-%Y', // '%Y%m%d',
        json: JSON.parse(JSON.stringify(this.timeseries_confirmed)) /* [
            {name: 'www.site1.com', upload: 200, download: 200, total: 400},
            {name: 'www.site2.com', upload: 100, download: 300, total: 400},
            {name: 'www.site3.com', upload: 300, download: 200, total: 500},
            {name: 'www.site4.com', upload: 400, download: 100, total: 500},
        ]*/,
        names: {
          total: 'Confirmed Cases'
        },
        keys: {
            x: 'report_date', // it's possible to specify 'x' when category axis
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
      /* data: {
          x: 'x',
          xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
          columns: [
               ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
            // ['x'].concat(time_data),
  //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
               ['data1', 30, 200, 100, 400, 150, 250]
              // ['data1', total_data]
          ]
      },
      axis: {
          x: {
              type: 'timeseries',
              tick: {
                   format: '%m-%d-%Y'
              }
          }
      }*/
  });
}
}
