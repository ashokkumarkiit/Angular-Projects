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
      /* data: {
        "AZ": {
          "fillKey": "Republican",
          "electoralVotes": 5
      },
      "CO": {
          "fillKey": "Light Democrat",
          "electoralVotes": 5
      },
      "DE": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "FL": {
          "fillKey": "UNDECIDED",
          "electoralVotes": 29
      },
      "GA": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "HI": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "ID": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "IL": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "IN": {
          "fillKey": "Republican",
          "electoralVotes": 11
      },
      "IA": {
          "fillKey": "Light Democrat",
          "electoralVotes": 11
      },
      "KS": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "KY": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "LA": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "MD": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "ME": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "MA": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "MN": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "MI": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "MS": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "MO": {
          "fillKey": "Republican",
          "electoralVotes": 13
      },
      "MT": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "NC": {
          "fillKey": "Light Republican",
          "electoralVotes": 32
      },
      "NE": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "NV": {
          "fillKey": "Heavy Democrat",
          "electoralVotes": 32
      },
      "NH": {
          "fillKey": "Light Democrat",
          "electoralVotes": 32
      },
      "NJ": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "NY": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "ND": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "NM": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "OH": {
          "fillKey": "UNDECIDED",
          "electoralVotes": 32
      },
      "OK": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "OR": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "PA": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "RI": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "SC": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "SD": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "TN": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "TX": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "UT": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "WI": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "VA": {
          "fillKey": "Light Democrat",
          "electoralVotes": 32
      },
      "VT": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "WA": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "WV": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "WY": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "CA": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "CT": {
          "fillKey": "Democrat",
          "electoralVotes": 32
      },
      "AK": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "AR": {
          "fillKey": "Republican",
          "electoralVotes": 32
      },
      "AL": {
          "fillKey": "Republican",
          "electoralVotes": 32
      }
      }*/
    });

    // Draw a legend for this map
    map.legend();
  }
}
