import { Component, OnInit, Input } from '@angular/core';
import { CountriesTotal } from 'src/app/countries-total';

@Component({
  selector: 'app-total-country-deaths',
  templateUrl: './total-country-deaths.component.html',
  styleUrls: ['./total-country-deaths.component.css']
})
export class TotalCountryDeathsComponent implements OnInit {

  @Input() confirmed_total_list: CountriesTotal[];
  
  constructor() { }

  ngOnInit() {
  }

}
