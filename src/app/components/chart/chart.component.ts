import { Component, inject, OnDestroy } from '@angular/core';
import { CovidDataService } from '../../services/covid-data/covid-data.service';
import { CountryHistoricalData } from '../../common/models/historical-data.models';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnDestroy {
  private readonly covidDataService: CovidDataService = inject(CovidDataService);

  unsubscribe = new Subject<void>();
  unsubscribe$ = this.unsubscribe.asObservable();

  chartType: ChartType = 'bar';

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Count'
        }
      }
    }
  };

  ngOnInit(): void {
    this.covidDataService.selectedCountryData$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: CountryHistoricalData) => {
      this.updateChartData(data);
    });
  }

  updateChartData(data: CountryHistoricalData): void {
    const dates = Object.keys(data.timeline.cases);

      this.chartData.labels = dates;
      this.chartData.datasets = [
        {
          label: 'Confirmed',
          data: dates.map(date => data.timeline.cases[date]),
          borderColor: 'blue',
          backgroundColor: 'blue'
        },
        {
          label: 'Deaths',
          data: dates.map(date => data.timeline.deaths[date]),
          borderColor: 'red',
          backgroundColor: 'red'
        },
        {
          label: 'Recovered',
          data: dates.map(date => data.timeline.recovered[date]),
          borderColor: 'green',
          backgroundColor: 'green'
        }
      ];
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
