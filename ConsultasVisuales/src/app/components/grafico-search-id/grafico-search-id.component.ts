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

  year: string = "";
  residence: string = "";
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: any;
  county: CountySearchIdResponse[] = [];

  constructor(private sharedService: SharedDataCountyService){
    this.chartOptions = {
      series: [],
      chart: {
        type: "donut"
      },
      labels:['Nacimientos', 'BMI Promedio Antes del Embarazo', 'Edad Promedio de la Madre', 'Peso de Nacimiento Promedio en gramos',
      'Edad Gestacional Promedio (Datos)', 'Número Promedio de Semanas Prenatales', 'Edad Gestacional Promedio (OE)',
      'BMI Promedio Antes del Embarazo'],
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

      if (data) {
        this.chartOptions.series = [
          data.births,
          data.ave_Pre_pregnancy_BMI,
          data.ave_Age_of_Mother,
          data.ave_Birth_Weight_gms,
          data.ave_LMP_Gestational_Age_Wks,
          data.ave_Number_of_Prenatal_Wks,
          data.ave_OE_Gestational_Age_Wks,
          data.ave_Pre_pregnancy_BMI
        ];
        this.year = data.year,
        this.residence = data.county_of_Residence

      }
    });
  }



}






