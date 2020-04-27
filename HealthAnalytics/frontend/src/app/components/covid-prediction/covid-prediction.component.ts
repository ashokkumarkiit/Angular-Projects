import { CovidData, CovidCustomData } from './../../covid-prediction-data';
import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import { NpoService } from 'src/app/npo.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-covid-prediction',
  templateUrl: './covid-prediction.component.html',
  styleUrls: ['./covid-prediction.component.css']
})
export class CovidPredictionComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'actual-predicted-confirmed', cols: 12, rows: 1, color: 'white'},
    {text: 'actual-predicted-deaths', cols: 12, rows: 1, color: 'white'},
    
  ];
  covid_data: CovidCustomData;
  obj_confirmed_predicted = []; 
  obj_death_predicted = []; 

  constructor(private npoService: NpoService) { }

  ngOnInit() {
    this.getCovidPredictionData();
  }

  ngAfterViewInit() {
    
  }

  getCovidPredictionData(): void {
    // this.isTimeSeriesConfirmedDataLoading = true;
    this.npoService.getCovidPredictionData().subscribe(
      res => {
        // this.isTimeSeriesConfirmedDataLoading = false;
        this.covid_data = res.covid_data;
        this.generateCombinedRecordForTimeseriesConfirmed();
        this.generateCombinedRecordForTimeseriesDeaths();
        this.generateChartConfirmed();
        this.generateChartDeaths();
      }
    );
  } 

  generateChartConfirmed() {
    if(document.getElementById('chart').innerHTML != null) {
      document.getElementById('chart').innerHTML = "";
    }
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        xFormat: '%m-%d-%Y',
        json: JSON.parse(JSON.stringify(this.obj_confirmed_predicted)),
        /*json: [
          {report_date: '10-13-2019', total_deaths: 200, total_recovered: 200},
          {report_date: '11-15-2019', total_deaths: 100, total_recovered: 300},
          {report_date: '12-15-2019', total_deaths: 300, total_recovered: 200},
          {report_date: '1-15-2020', total_deaths: 400, total_recovered: 100},
        ],*/
        names: {
          total_confirmed: 'Confirmed',
          total_predicted: 'Predicted'
        },
        keys: {
            x: 'report_date',
            value: ['total_confirmed','total_predicted'],
        }
      },
      legend: {
        position: 'inset'
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%m-%d',
                rotate: -60,
                multiline: false
            },
            height: 100
        }
      } 
    });
  }

  generateChartDeaths() {
    if(document.getElementById('chart1').innerHTML != null) {
      document.getElementById('chart1').innerHTML = "";
    }
    var chart = c3.generate({
      bindto: '#chart1',
      data: {
        x: 'x',
        xFormat: '%m-%d-%Y',
        json: JSON.parse(JSON.stringify(this.obj_death_predicted)),
        /*json: [
          {report_date: '10-13-2019', total_deaths: 200, total_recovered: 200},
          {report_date: '11-15-2019', total_deaths: 100, total_recovered: 300},
          {report_date: '12-15-2019', total_deaths: 300, total_recovered: 200},
          {report_date: '1-15-2020', total_deaths: 400, total_recovered: 100},
        ],*/
        names: {
          total_deaths: 'Deaths',
          total_predicted: 'Predicted'
        },
        keys: {
            x: 'report_date',
            value: ['total_deaths','total_predicted'],
        }
      },
      legend: {
        position: 'inset'
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%m-%d',
                rotate: -60,
                multiline: false
            },
            height: 100
        }
      } 
    });
  }

  generateCombinedRecordForTimeseriesConfirmed() {
    let kvData = new Map;
    this.covid_data.confirmed.forEach(element => {
      let data = {
        report_date: element.report_date,
        total_confirmed: element.total,
        total_predicted: null
      }
      kvData.set(element.report_date,data);
    });

    this.covid_data.confirmed_predict.forEach(element => {

      // let prevData = kvData.get(element.report_date);
      let new_data = {
        report_date: element.report_date,
        total_confirmed: null,
        total_predicted: element.total
      }
      kvData.set(element.report_date,new_data);
    });

    // console.log(kvData);
    

    this.covid_data.confirmed.forEach(element => {
      this.obj_confirmed_predicted.push(kvData.get(element.report_date));
    });

    this.covid_data.confirmed_predict.forEach(element => {
      this.obj_confirmed_predicted.push(kvData.get(element.report_date));
    });
  
    // console.log(this.obj_death_recovered);
  }

  generateCombinedRecordForTimeseriesDeaths() {
    let kvData = new Map;
    this.covid_data.deaths.forEach(element => {
      let data = {
        report_date: element.report_date,
        total_deaths: element.total,
        total_predicted: null
      }
      kvData.set(element.report_date,data);
    });

    this.covid_data.deaths_predict.forEach(element => {

      // let prevData = kvData.get(element.report_date);
      let new_data = {
        report_date: element.report_date,
        total_deaths: null,
        total_predicted: element.total
      }
      kvData.set(element.report_date,new_data);
    });

    // console.log(kvData);
    

    this.covid_data.deaths.forEach(element => {
      this.obj_death_predicted.push(kvData.get(element.report_date));
    });

    this.covid_data.deaths_predict.forEach(element => {
      this.obj_death_predicted.push(kvData.get(element.report_date));
    });
  
    // console.log(this.obj_death_recovered);
  }

}
