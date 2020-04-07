import { Component, OnInit, Input } from '@angular/core';
import { CountriesTotal } from 'src/app/countries-total';

@Component({
  selector: 'app-total-country-recovered',
  templateUrl: './total-country-recovered.component.html',
  styleUrls: ['./total-country-recovered.component.css']
})
export class TotalCountryRecoveredComponent implements OnInit {

  @Input() confirmed_total_list: CountriesTotal[];
  
  constructor() { }

  ngOnInit() {
  }

}
