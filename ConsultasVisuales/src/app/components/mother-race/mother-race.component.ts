import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-mother-race',
  templateUrl: './mother-race.component.html',
  styleUrls: ['./mother-race.component.css']
})
export class MotherRaceComponent implements OnInit{

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private sharedService: SharedDataCountyService) {
    this.chartOptions = {
      series: [
        {
          name: "Births",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["Blanco"],
          ["Negro o", "Afroamericano"],
          ["Asiático"],
          ["Más de", "una raza"],
          ["Indígena Americano", "o Nativo de Alaska"],
          ["Nativo Hawaiano", "u Otro", "Isleño del Pacífico"],
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }
  ngOnInit(): void {
    console.log("Ingresando al ngOnInt de motherRaceComponent");
    this.sharedService.dataMotherRaceFiltersAsObservable$.subscribe(data =>{
      console.log("Datos de  setDataMotherRaceFilters() despues de emitir: ", data);
      this.chartOptions.series![0].data = [
        data!.white,
        data!.blackOrAfricanAmerican,
        data!.asian,
        data!.moreThanOneRace,
        data!.americanIndianOrAlaskaNative,
        data!.nativeHawaiianOrOtherPacificIslander
      ]
    })
  }

}
