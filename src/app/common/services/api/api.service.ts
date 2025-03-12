import { inject, Injectable } from '@angular/core';
import { Country } from '../../models/country.models';
import { Observable, ReplaySubject, Subject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CountryHistoricalData } from '../../models/historical-data.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://disease.sh/v3/covid-19/';
  private readonly httpClient: HttpClient = inject(HttpClient);

  public countryData = new Subject<CountryHistoricalData>();

  /**
   * Gets all countries from the API.
   * 
   * @returns An observable of an array of countries.
   */
  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.API_URL}countries`);
  }

  /**
   * This is the method to get the historical data of a country.
   * It will call the API to get the historical data of the country and then update the countryData subject.
   * 
   * @param country To be used to get the historical data of the country.
   * @param timeFrame To be used to get the historical data of the country for a specific time frame.
   */
  getHistorycalData(country: string, timeFrame: number): void {
    this.httpClient
    .get<CountryHistoricalData>(`${this.API_URL}historical/${country}?lastdays=${timeFrame}`)
    .pipe(take(1))
    .subscribe((data) => {
      this.countryData.next(data);
    });
  }
}
