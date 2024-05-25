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
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" 
        (click)="filterResults(filter.value)">Search</button>
      </form>
      <section class="results">
      <!-- <app-housing-location [housingLocation]='housingLocation'></app-housing-location> -->
      <app-housing-location
        *ngFor = "let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
      <!-- <p *ngFor="let x of numbers"> {{x}}</p> -->
      </section>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl = `https://angular.io/assets/images/tutorials/faa`;

  // numbers : number[] = Array(5).fill(3);
  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) =>
    {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  } 

  filterResults(text: string)
  {
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
      housingLocation?.state.toLocaleLowerCase().includes(text.toLocaleLowerCase()) 
    );

  }
 
}
