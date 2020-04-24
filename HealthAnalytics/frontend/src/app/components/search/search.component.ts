import { Fitness } from './../../fitness';
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from 'src/app/search.service';
import { DropDown } from 'src/app/options';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fitnesses: Fitness[];
  pos: Position;

  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;

  selected: String = '5000';

  isSearching:Boolean = false;

  tiles: Tile[] = [
    {text: '', cols: 2, rows: 1, color: 'white'},
    {text: 'search-input', cols: 5, rows: 1, color: 'white'},
    {text: 'search-radius', cols: 2, rows: 1, color: 'white'},
    {text: 'search-button', cols: 1, rows: 1, color: 'white'},
    {text: '', cols: 2, rows: 1, color: 'white'}
  ];

  constructor(private searchService: SearchService,
              public zone: NgZone) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }


  getFitnessByLocation() {
  this.isSearching = true;
    this.searchService.getFitnessByLocation(this.searchService.latitude,
        this.searchService.longitude, this.selected).subscribe(
      res => {
        this.fitnesses = res.search_result;
        this.isSearching = false;
      }
    );
  }

  getCurrentLocation() {
    this.searchService.getCurrentLocation().subscribe(
      res => {
        this.pos = res.geo_pos;
        this.searchService.latitude = this.pos.coords.latitude;
        this.searchService.longitude = this.pos.coords.longitude;
        this.getFitnessByLocation();
      }
    );
  }

  callSearchAPI() {
    this.getFitnessByLocation();
  }

}
