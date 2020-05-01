import { Component, OnInit, Input } from '@angular/core';
import * as Datamap from 'node_modules/datamaps/dist/datamaps.all.min.js';
import * as d3 from 'd3v3';
import { NpoService } from 'src/app/npo.service';

@Component({
  selector: 'app-map-analytics',
  templateUrl: './map-analytics.component.html',
  styleUrls: ['./map-analytics.component.css']
})
export class MapAnalyticsComponent implements OnInit {

  @Input() map_data: any;
  @Input() fill_key: Number[];

  constructor(private npoService: NpoService) { }

  ngOnInit() {
    // this.getMapData();

  }


  /* getMapData() {
    this.npoService.getMapData().subscribe(
      res => {
        console.log(res);
        this.map_data = res.map_records;
        this.renderUsMap()
    }
  );
  }*/

  ngAfterViewInit() {
    this.renderUsMap()
  }
  

  

  renderUsMap() {
    if(document.getElementById('container').innerHTML != null) {
      document.getElementById('container').innerHTML = "";
    }
    var width = 1400,
    height = 400,
    centered;
    var map = new Datamap({
      scope: 'usa',
      element: document.getElementById('container'),
      setProjection: function(element) {
        var projection = d3.geo.albersUsa()
            .scale(800)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);
    
        return {path: path, projection: projection};
      },
      fills: this.fill_key, // {
          /* "21.2 - 28.6": '#e5f4d7',
          "28.7 - 31.1": '#A0E5A9',
          "31.2 - 33.6": '#62D2B4',
          "33.7 - 40.6": '#2B8CBE',*/
          //"21.2 - 28.6": '#e5f4d7',
          //"28.7 - 31.1": '#A0E5A9',
          //"31.2 - 33.6": '#62D2B4',
          //"33.7 - 40.6": '#2B8CBE',
          // defaultFill: '#999999'
          /* 'Republican': '#CC4731',
          'Democrat': '#306596',
          'Heavy Democrat': '#667FAF',
          'Light Democrat': '#A9C0DE',
          'Heavy Republican': '#CA5E5B',
          'Light Republican': '#EAA9A8',
          defaultFill: '#EDDC4E' */
      //},
      data: this.map_data
    });

    // Draw a legend for this map
    map.legend();
  }
}
