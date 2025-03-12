import { Component, inject } from '@angular/core';
import { CovidDataService } from '../../services/covid-data/covid-data.service';

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrl: './country-dropdown.component.scss'
})
export class CountryDropdownComponent {
  public readonly covidDataService: CovidDataService = inject(CovidDataService);
}
