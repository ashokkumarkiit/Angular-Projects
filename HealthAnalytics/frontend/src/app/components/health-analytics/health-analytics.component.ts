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

  selected_category:String = '';
  selected_year:String = '';
  selected_viewby:String = '';
  selected_subviewby:String = '';
  

  constructor(private npoService: NpoService) { }

  ngOnInit() {
    this.getCategory();
    this.getYear();
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

}
