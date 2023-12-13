import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-maternal-morbidity',
  templateUrl: './maternal-morbidity.component.html',
  styleUrls: ['./maternal-morbidity.component.css']
})
export class MaternalMorbidityComponent implements OnInit{

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private sharedService: SharedDataCountyService) {
    this.chartOptions = {
      series: [
        {
          name: "Maternal_Morbidity_YN",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Maternal_Morbidity_YN"
      },
      xaxis: {
        categories: [
          "Desconocido o No Especificado",
          "Ninguno seleccionado",
          "Al menos uno seleccionado",
        ]
      }
    };
  }
  ngOnInit(): void {
    console.log("ngOnInit de maternal ts");
    this.sharedService.dataMaternalFiltersAsObservable$.subscribe(data => {
      console.log("Datos despues de emitir de dataMaternalFiltersAsObservable$: ", data);
      if(data){
        this.chartOptions.series![0].data = [
          data.unknownOrNotStated,
          data.noneChecked,
          data.atLeastOneChecked
        ]
      }
    })
  }
}
