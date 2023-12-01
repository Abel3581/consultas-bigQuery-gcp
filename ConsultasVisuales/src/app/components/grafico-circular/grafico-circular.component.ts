import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: any; // Agrega esta propiedad
  colors: string[]; // Agrega esta propiedad
};

@Component({
  selector: 'app-grafico-circular',
  templateUrl: './grafico-circular.component.html',
  styleUrls: ['./grafico-circular.component.css']
})
export class GraficoCircularComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private sharedDataService:SharedDataServiceService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 680,
        type: "pie"
      },
      labels: [],
      plotOptions: { // Agrega esta configuración para controlar el tamaño y colores
        pie: {
          size: 250, // Ajusta este valor para cambiar el tamaño de los pedazos
          expandOnClick: false,
          donut: {
            size: '70%', // Ajusta este valor para tener un agujero en el medio
          }

        }
      },

      responsive: [
        {
          breakpoint: 680,
          options: {
            chart: {
              width: 650
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      colors: ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF', '#FF9900', '#2533FF','#FF9F99'] // Agrega esta propiedad
    };
  }

  ngOnInit(): void {
    this.sharedDataService.data$.subscribe(data => {
    // Actualiza las opciones del gráfico cuando cambian los datos
    console.log("Data graficoCircular: ", data);
  // Selecciona las propiedades que deseas utilizar
    const attributeNames = Object.keys(data[0]);

    // Mapea los valores y atributos dinámicamente
    this.chartOptions.series = attributeNames.map(attribute => parseFloat(data[0][attribute]));
    this.chartOptions.labels = attributeNames;

    })
  }
}


