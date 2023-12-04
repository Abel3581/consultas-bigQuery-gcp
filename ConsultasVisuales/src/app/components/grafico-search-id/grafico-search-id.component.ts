import {  Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";
import { CountySearchIdResponse } from 'src/app/model/county-search-id-response';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;

};
@Component({
  selector: 'app-grafico-search-id',
  templateUrl: './grafico-search-id.component.html',
  styleUrls: ['./grafico-search-id.component.css']
})
export class GraficoSearchIdComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: any;
  county: CountySearchIdResponse[] = [];
  constructor(private sharedService: SharedDataCountyService){
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

    this.sharedService.dataSearchIdBehavior$.subscribe(data => {
      console.log("Datos de setDataSearchId (después de emitir): ", data);

      if (data && data.length > 0) {
        // Selecciona las propiedades que deseas utilizar
        const attributeNames = Object.keys(data[0]);

        // Mapea los valores y atributos dinámicamente para las series
        this.chartOptions.series = attributeNames.map(attribute => {
          const value = data[0][attribute];

          // Utiliza parseFloat para convertir el valor a número
          return parseFloat(value) || 0;
        });

        // Mapea los atributos para los labels
        this.chartOptions.labels = attributeNames.map(attribute => {
          // Aquí puedes aplicar cualquier lógica de formateo que desees para los labels
          return attribute;
        });
      }
    });
  }



}






