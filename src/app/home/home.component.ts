import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city">
        <button class="primary" type="button">Search</button>
      </form>
      <section class="results">
      <!-- <app-housing-location [housingLocation]='housingLocation'></app-housing-location> -->
      <app-housing-location
        *ngFor = "let housingLocation of housingLocationList"
        [housingLocation]='housingLocation'>
      </app-housing-location>
      <p *ngFor="let x of numbers"> {{x}}</p>
      </section>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = `https://angular.io/assets/images/tutorials/faa`;

  numbers : number[] = Array(5).fill(3);

  housingLocation: HousingLocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test City',
    state: 'Test State',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  } 
 
}
