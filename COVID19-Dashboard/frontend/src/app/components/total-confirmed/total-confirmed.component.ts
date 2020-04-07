import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-confirmed',
  templateUrl: './total-confirmed.component.html',
  styleUrls: ['./total-confirmed.component.css']
})
export class TotalConfirmedComponent implements OnInit {

  @Input() tile_name: String;
  @Input() total: String;

  constructor() { }

  ngOnInit() {
  }

}
