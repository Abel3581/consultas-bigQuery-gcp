import { Component, OnInit } from '@angular/core';
import { CountyNatalityFilter } from 'src/app/model/county-natality-filter';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

@Component({
  selector: 'app-nacimientos-por-ano-component',
  templateUrl: './nacimientos-por-ano-component.component.html',
  styleUrls: ['./nacimientos-por-ano-component.component.css']
})
export class NacimientosPorAnoComponentComponent implements OnInit {

  chartOptions: any;
  dataResponse: CountyNatalityFilter | null = null;

  constructor(private sharedData: SharedDataCountyService) {
    // Configura las opciones del gráfico inicialmente con un conjunto vacío de datos
    this.chartOptions = {
      series: [
        {
          name: 'Nacimientos',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,

      },
      xaxis: {
        categories: [],
      },
      title: {
        text: 'Nacimientos',
      },
    };
  }

  ngOnInit(): void {
    this.sharedData.dataCountyFilterBehavior$.subscribe(data => {
      console.log("Datos de setdataCountyFilter (después de emitir): ", data);

      if (data) {
        // Actualizar el gráfico con los nuevos datos
        this.chartOptions.series[0].data = [
          data.births2016,
          data.births2017,
          data.births2018,
        ];
        // Object { year20180101: "2018-01-01", year20170101: "2017-01-01", year20160101: "2016-01-01", births2018: 3791712, births2017: 3855500, births2016: 3945875 }
        this.chartOptions.xaxis.categories = [
          data.year20160101.toString(),
          data.year20170101.toString(),
          data.year20180101.toString(),
        ];
      }
      console.log("series:", this.chartOptions.series);
      console.log("Categorias:", this.chartOptions.xaxis.categories);
    });
  }

}
