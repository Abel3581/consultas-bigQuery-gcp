import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
@Component({
  selector: 'app-father-race',
  templateUrl: './father-race.component.html',
  styleUrls: ['./father-race.component.css']
})
export class FatherRaceComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private sharedService: SharedDataCountyService){
    this.chartOptions = {
      series: [
        {
          name: "Births",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit(): void {
    console.log("Entrando a ngOnInit fatherComponent");
    this.sharedService.dataFatherRaceFiltersAsObservable$.subscribe(data => {
      console.log("Datos despues de emitir: ", data);

      if(data){
        this.chartOptions.series![0].data = [
          data.nativeHawaiianOrOtherPacificIslander,
          data.americanIndianOrAlaskaNative,
          data.moreThanOneRace,
          data.asian,
          data.blackOrAfricanAmerican,
          data.unknownOrNotStated,
          data.white,
        ];
        this.chartOptions.xaxis!.categories = [
          ['Nativo de Hawái u', 'Otro Isleño del Pacífico'],
          ['Indígena Americano', 'o Nativo de Alaska'],
          'Más de una raza',
          'Asiático',
          'Negro o Afroamericano',
          'Desconocido o No Especificado',
          'Blanco',
        ]
      }
    })
  }

}
