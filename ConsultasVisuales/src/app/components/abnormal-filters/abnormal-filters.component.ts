import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';
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
import { AbnormalFiltersResponse } from 'src/app/model/abnormal-filters-response';
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
  selector: 'app-abnormal-filters',
  templateUrl: './abnormal-filters.component.html',
  styleUrls: ['./abnormal-filters.component.css']
})
export class AbnormalFiltersComponent implements OnInit{

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  abnormalFilterResponse:AbnormalFiltersResponse | null = null;

  constructor(private sharedService: SharedDataCountyService) {
    console.log("Constructor del componente ejecutado");
    this.chartOptions = {
      series: [
        {
          name: "Abnormal_Conditions_Checked_YN",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
             console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#00E396",
        "#FF4560",
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
          ["Ninguno", "Seleccionado"],
          ["Desconocido", "O No", "Indicado"],
          ["Al Menos", "Uno Seleccionado"]

        ],
        labels: {
          style: {
            colors: [
              "#00E396",
              "#FF4560",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }
  ngOnInit(): void {
    console.log("ngOnInit del componente ejecutado");
    this.sharedService.dataAbnormalAsObservable$.subscribe(data =>{
      console.log("Datos de setDataAbnormalFilters (después de emitir): ", data);
      if (data) {
        if (this.chartOptions && this.chartOptions.series && this.chartOptions.series[0]) {
            this.chartOptions.series[0].data = [
              data.noneChecked,
              data.unknownOrNotStated,
              data.atLeastOneChecked
            ];
        }
      }
    })
  }



}
