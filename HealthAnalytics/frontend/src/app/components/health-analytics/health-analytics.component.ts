import { AnalyticsBarchart } from 'src/app/analytics-bar-chart';
import { Component, OnInit } from '@angular/core';
import { NpoService } from 'src/app/npo.service';
import { DDLSelect } from 'src/app/analytics-select';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-health-analytics',
  templateUrl: './health-analytics.component.html',
  styleUrls: ['./health-analytics.component.css']
})
export class HealthAnalyticsComponent implements OnInit {

  tiles: Tile[] = [
    {text: '', cols: 2, rows: 2, color: 'white'},
    {text: 'filter-category', cols: 3, rows: 1, color: 'white'},
    {text: 'filter-year', cols: 3, rows: 1, color: 'white'},
    {text: 'filter-button', cols: 2, rows: 2, color: 'white'},
    {text: '', cols: 2, rows: 2, color: 'white'},
    {text: 'filter-viewby', cols: 3, rows: 1, color: 'white'},
    {text: 'filter-viewby-sub', cols: 3, rows: 1, color: 'white'},
    
  ];
  
  filter_category: DDLSelect[];
  filter_year: DDLSelect[];
  filter_subview: DDLSelect[];

  selected_category:String = 'Obesity / Weight Status';
  selected_year:String = '2018';
  selected_viewby:String = 'Age';
  selected_subviewby:String = '45 - 54';
  map_data: any;
  fill_key: Number[];
  isMapDataLoaded: Boolean = false;
  barchart_data: AnalyticsBarchart[];
  isBarchartDataLoaded: Boolean = false;

  constructor(private npoService: NpoService) { }

  ngOnInit() {
    this.getCategory();
    this.getYear();
    this.getMapData();
    this.getAnalyticsBarChart();
  }

  getCategory() {
    this.npoService.getCategory().subscribe(
      res => {
        this.filter_category = res.select_value;
    }
  );
  }

  getYear() {
    this.npoService.getYear().subscribe(
      res => {
        this.filter_year = res.select_value;
    }
  );
  }

  fetchSubViewByList(event) {
    console.log(event.value);
    this.npoService.getSubView(event.value).subscribe(
      res => {
        this.filter_subview = res.select_value;
    }
  );
  }  
  getMapData() {
    this.isMapDataLoaded = true;
    this.npoService.getMapData(this.selected_category,
       this.selected_year, this.selected_viewby,
        this.selected_subviewby).subscribe(
      res => {
        console.log(res);
        this.isMapDataLoaded = false;
        this.map_data = res.map_records;
        this.fill_key = res.fill_key;
    }
  );
  }

  callMapDataAPI() {
    this.getMapData();
    this.getAnalyticsBarChart();
  }

  getAnalyticsBarChart() {
    this.isBarchartDataLoaded = true;
    this.npoService.getAnalyticsBarChart(this.selected_category,
       this.selected_year, this.selected_viewby,
        this.selected_subviewby).subscribe(
      res => {
        console.log(res);
        this.isBarchartDataLoaded = false;
        this.barchart_data = res.barchart_data;
      }
    );
  }


}
