/// <reference types="@types/googlemaps" />
import { SearchService } from './../search.service';
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'AutocompleteComponent',
    template: `
      <input class="input"
        type="text"
        [(ngModel)]="autocompleteInput"
        #addresstext style="padding: 7px;
        border: 1px solid #ccc;
        width: 500px;
        font-size: 15px;
        border-radius: 5px;"
        >
    `,
})
export class AutocompleteComponent implements OnInit, AfterViewInit {
    @Input() adressType: string;
    @Output() setAddress: EventEmitter<any> = new EventEmitter();
    @ViewChild('addresstext') addresstext: any;

    autocompleteInput: string;
    queryWait: boolean;

    constructor(private searchService: SearchService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getPlaceAutocomplete();
    }

    private getPlaceAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
            {
                componentRestrictions: { country: 'US' },
                types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
            });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            this.searchService.longitude = autocomplete.getPlace().geometry.location.lng();
            this.searchService.latitude = autocomplete.getPlace().geometry.location.lat();
            this.invokeEvent(place);
        });
    }

    invokeEvent(place: Object) {
        this.setAddress.emit(place);
    }

}
