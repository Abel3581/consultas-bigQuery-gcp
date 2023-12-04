import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;

};

import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';


@Component({
  selector: 'app-distributed-columns',
  templateUrl: './distributed-columns.component.html',
  styleUrls: ['./distributed-columns.component.css']
})
export class DistributedColumnsComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: any;

  constructor(private sharedService: SharedDataServiceService){
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200

            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


   ngOnInit(): void {
    console.log("Entrando a ngOnInit de grafico-search-id");
    this.sharedService.dataGraColumnasSearch$.subscribe(data => {
      console.log("Datos de setDataSearchId (después de emitir): ", data);

      // Selecciona las propiedades que deseas utilizar
    const attributeNames = Object.keys(data[0]);

    // Mapea los valores y atributos dinámicamente
    this.chartOptions.series = attributeNames.map(attribute => parseFloat(data[0][attribute]));
    this.chartOptions.labels = attributeNames;
    });
    console.log("Chart Options:", this.chartOptions);
  }



}









