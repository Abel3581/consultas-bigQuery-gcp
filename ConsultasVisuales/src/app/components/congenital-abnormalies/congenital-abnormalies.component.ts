import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; //ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};
@Component({
  selector: 'app-congenital-abnormalies',
  templateUrl: './congenital-abnormalies.component.html',
  styleUrls: ['./congenital-abnormalies.component.css']
})
export class CongenitalAbnormaliesComponent implements OnInit{

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private sharedService: SharedDataCountyService) {
    this.chartOptions = {
      series: [
        {
          name: "Congenital_Abnormality_Checked_YN",
          data: []
        }
      ],
      annotations: {
        points: [
          {
            x: "None checked",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Congenital_Abnormality_Checked_YN"
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 5

        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: [
          "Desconocido o No Especificado",
          "Ninguno Seleccionado",
          "Al Menos Uno Seleccionado",

        ],
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Congenital_Abnormality_Checked_YN"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };
  }
  ngOnInit(): void {
    console.log("ngOnInit de congenital componente");
    this.sharedService.dataCongenitalAsObservable$.subscribe(data => {
      console.log("Datos de setDataCongenitalFilters (después de emitir): ", data);
      if(data){
        this.chartOptions.series![0].data = [
          data.unknownOrNotStated,
          data.noneChecked,
          data.atLeastOneChecked

      ];
      }

    })
  }
}
