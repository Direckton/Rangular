import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: `
    <p>
      details works! {{ housingLocationId }}
    </p>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;
  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);
  }
}
