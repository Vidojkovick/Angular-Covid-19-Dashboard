import { inject, Injectable } from '@angular/core';
import { Country } from '../../common/models/country.models';
import { ApiService } from '../../common/services/api/api.service';
import { Observable } from 'rxjs';
import { CountryHistoricalData } from '../../common/models/historical-data.models';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  private readonly apiService: ApiService = inject(ApiService);

  countries: Observable<Country[]>;
  selectedCountry: Country | null = null;
  selectedTimeFrame: number = 30;

  selectedCountryData$: Observable<CountryHistoricalData>;

  constructor() {
    this.selectedCountryData$ = this.apiService.countryData.asObservable();
    this.countries = this.apiService.getAllCountries();
  }

  /**
   * Sets the selected country and fetches the data for the selected country.
   * 
   * @param country The country to be set as selected.
   */
  setSelectedCountry(country: Country): void {
    this.selectedCountry = country;

    this.fetchDataWithNewParams();
  }

  /**
   * Sets the selected time frame and fetches the data for the selected time frame.
   * 
   * @param selectedTimeFrame The time frame to be set as selected.
   */
  setSelectedTimeFrame(selectedTimeFrame: number): void {
    this.selectedTimeFrame = selectedTimeFrame;

    this.fetchDataWithNewParams();
  }

  /**
   * Fetches the data with the selected filters.
   */
  fetchDataWithNewParams(): void {
    if (!this.selectedCountry || !this.selectedTimeFrame) {
      return;
    }

    this.apiService.getHistorycalData(this.selectedCountry?.country, this.selectedTimeFrame);
  }
}
