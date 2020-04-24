import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private searchService: SearchService) { }

  title = 'ChicagoSocialHub-app';
  registerView;

  ngOnInit() {
    this.searchService.getCurrentLocation();
  }

  callHomePage() {
    console.log('called find');
    this.registerView = 'regView2';
    this.router.navigate(['/find']);
  }
}
