import { MapData } from './../../map-data';
import { Component, OnInit, Input } from '@angular/core';
import * as Datamap from 'node_modules/datamaps/dist/datamaps.world.min.js';
import { CovidService } from './../../covid.service';
import { interval } from 'rxjs'

@Component({
  selector: 'app-world-map-report',
  templateUrl: './world-map-report.component.html',
  styleUrls: ['./world-map-report.component.css']
})
export class WorldMapReportComponent implements OnInit {

  isMapDataLoading: Boolean = false;
  map_data: MapData[];
  
  constructor(private covidService: CovidService) { }

  ngOnInit() {
    this.getWorldLocations();
    interval(60*1000).subscribe(() => {
      this.getWorldLocations();
    });
  }

  getWorldLocations(): void {
    this.isMapDataLoading = true;
    this.covidService.getWorldLocations().subscribe(
      res => {
        this.isMapDataLoading = false;
        this.map_data = res.world_location;
        this.renderMap();
      }
    );
  }

  renderMap() {
    if(document.getElementById('container').innerHTML != null) {
      document.getElementById('container').innerHTML = "";
    }
    
    var bubbleMap = new Datamap({
      element: document.getElementById('container'),
      scope: 'world',
      geographyConfig: {
          popupOnHover: true,
          highlightOnHover: false,
      },
      bubblesConfig: {
        borderWidth: 0,
        borderOpacity: 1,
        borderColor: '#FFFFFF',
        popupOnHover: true, // True to show the popup while hovering
        radius: null,
        fillOpacity: 0.75,
        animate: true,
        highlightOnHover: true,
        highlightFillColor: '#FC8D59',
        highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1,
        highlightFillOpacity: 0.85,
        exitDelay: 100, // Milliseconds
        key: JSON.stringify
      },
      fills: {
          'grey': 'rgb(210, 210, 210)',
          'bubbleColorLightRed': 'ff562a',
          defaultFill: 'rgb(210, 210, 210)'
      },
      data: {
          'RUS': {fillKey: 'light_red'},
          'PRK': {fillKey: 'light_red'},
          'PRC': {fillKey: 'light_red'},
          'IND': {fillKey: 'light_red'},
          'GBR': {fillKey: 'light_red'},
          'FRA': {fillKey: 'light_red'},
          'PAK': {fillKey: 'light_red'},
          'USA': {fillKey: 'light_red'}
      }
    });
  
    var data_bubbles = this.map_data;
    
  //draw bubbles for available data
  bubbleMap.bubbles(data_bubbles, {
      popupTemplate: function (geo, data) {
              return ['<div class="hoverinfo"> Location: ' +  data.province_state.trim() !== "" ? data.country_region + '('+data.province_state + ')' : data.country_region,
              '<br/>Confirmed: ' +  data.confirmed + '',
              '<br/>Deaths: ' +  data.deaths + '',
              '<br/>Recovered: ' +  data.recovered + '',
              '<br/>Active: ' +  data.active + '',
              '</div>'].join('');
      }
    });
  }
}
