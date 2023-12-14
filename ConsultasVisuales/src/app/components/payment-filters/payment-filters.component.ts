import { Component, OnInit } from '@angular/core';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

@Component({
  selector: 'app-payment-filters',
  templateUrl: './payment-filters.component.html',
  styleUrls: ['./payment-filters.component.css']
})
export class PaymentFiltersComponent implements OnInit{

  chartOptions: any;

  constructor(private sharedData: SharedDataCountyService) {
    // Configura las opciones del gráfico inicialmente con un conjunto vacío de datos
    this.chartOptions = {
      series: [
        {
          name: 'Source_of_Payment_Code',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,

      },
      xaxis: {
        categories: ['No Especificado','Otro','Pago Personal','Seguro Privado','Medicaid'],
      },
      title: {
        text: 'Source_of_Payment_Code',
      },
    };
  }
  ngOnInit(): void {
    this.sharedData.dataPaymentFiltersAsObservable$.subscribe(data => {
      console.log("Datos de setdataPaymentFilters (después de emitir): ", data);
      if(data){
        this.chartOptions.series[0].data = [
          data.unknownOrNotStated,
          data.other,
          data.selfPay,
          data.privateInsurance,
          data.medicaid
        ];

      }
    })
  }
}
