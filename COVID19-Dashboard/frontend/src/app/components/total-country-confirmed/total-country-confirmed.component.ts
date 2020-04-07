import { CountriesTotal } from 'src/app/countries-total';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-country-confirmed',
  templateUrl: './total-country-confirmed.component.html',
  styleUrls: ['./total-country-confirmed.component.css']
})
export class TotalCountryConfirmedComponent implements OnInit {

  @Input() confirmed_total_list: CountriesTotal[];

  constructor() {
   }

  ngOnInit() {
  }

}
