import { Component, inject } from '@angular/core';
import { CovidDataService } from '../../services/covid-data/covid-data.service';
import { Country } from '../../common/models/country.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public readonly covidDataService: CovidDataService = inject(CovidDataService);

  public readonly timePeriods = [
    { label: '30 days', value: 30 },
    { label: '6 months (180 days)', value: 180 },
    { label: '1 year (365 days)', value: 365 }
  ];

  setCountry(country: Country): void {
    this.covidDataService.setSelectedCountry(country);
  }

  setSelectedTimeFrame(timeFrame: number): void {
    this.covidDataService.setSelectedTimeFrame(timeFrame);
  }
}
