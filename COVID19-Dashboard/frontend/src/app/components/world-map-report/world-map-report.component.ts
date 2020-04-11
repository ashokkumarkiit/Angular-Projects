import { MapData } from './../../map-data';
import { Component, OnInit, Input } from '@angular/core';
import * as Datamap from 'node_modules/datamaps/dist/datamaps.world.min.js';
import { CovidService } from './../../covid.service';

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
    // console.log("Inside world-map-report component - ", this.map_data);
    // this.renderMap();
    // let map = new Datamap({element: document.getElementById('container')});
    this.getWorldLocations();
    // this.renderMap();
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
    var bombMap = new Datamap({
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
          /* 'RUS': '#9467bd',
          'PRK': '#ff7f0e',
          'PRC': '#2ca02c',
          'IND': '#e377c2',
          'GBR': '#8c564b',
          'FRA': '#d62728',
          'PAK': '#7f7f7f',*/
          defaultFill: 'rgb(210, 210, 210)'// '#ff562a'
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
  
    var bombs = this.map_data;
    // console.log(bombs);
    /* [{
      name: 'Joe 4',
      radius: 25,
      yield: 400,
      country: 'USSR',
      fillKey: 'RUS',
      significance: 'First fusion weapon test by the USSR (not "staged")',
      date: '1953-08-12',
      latitude: 50.07,
      longitude: 78.43
    },{
      name: 'RDS-37',
      radius: 40,
      yield: 1600,
      country: 'USSR',
      fillKey: 'RUS',
      significance: 'First "staged" thermonuclear weapon test by the USSR (deployable)',
      date: '1955-11-22',
      latitude: 50.07,
      longitude: 78.43

    },{
      name: 'Tsar Bomba',
      radius: 20,
      yield: 50000,
      country: 'USSR',
      fillKey: 'RUS',
      significance: 'Largest thermonuclear weapon ever tested—scaled down from its initial 100 Mt design by 50%',
      date: '1961-10-31',
      latitude: 73.482,
      longitude: 54.5854
    }
  ];*/
  //draw bubbles for bombs
  bombMap.bubbles(bombs, {
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
