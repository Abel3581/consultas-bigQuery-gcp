import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  constructor(private sharedService: SharedDataCountyService, private cdr: ChangeDetectorRef,){
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

      this.updateChartData(data);
    });
  }

  private updateChartData(data: CountySearchIdResponse[]): void {
    // Realiza las operaciones necesarias con los datos
    this.county = data;

   // Filtra las propiedades que deseas utilizar y que no son nulas
  const attributes = Object.keys(data[0]);
  const nonNullAttributes = attributes.filter(attribute => data[0][attribute] !== null);

  // Mapea los valores y atributos dinámicamente
  this.chartOptions.series = nonNullAttributes.map(attribute => parseFloat(data[0][attribute]));

  // Filtra solo los nombres de propiedades que no tienen valores nulos
  const nonNullAttributeNames = nonNullAttributes.filter(attribute => data[0][attribute] !== null);
  this.chartOptions.labels = nonNullAttributeNames;

  // Llama a detectChanges para que Angular actualice la vista
  console.log(this.chartOptions.series);
  console.log(this.chartOptions.labels);
  this.cdr.detectChanges();
  }


  // ngOnInit(): void {
  //   // console.log("Entrando a ngOnInit de grafico-search-id");
  //   // this.sharedService.dataSearchIdBehavior$.subscribe(countyNatalityResponse => {
  //   //   console.log("Datos de setDataearchId (después de emitir): ", countyNatalityResponse);
  //   //   this.county = countyNatalityResponse;
  //   //   console.log(this.county);

  //   //     // const attributeNames = Object.keys(data[0]);
  //   //     // console.log("Nombres de atributos: ", attributeNames);

  //   // });
  // }

}
