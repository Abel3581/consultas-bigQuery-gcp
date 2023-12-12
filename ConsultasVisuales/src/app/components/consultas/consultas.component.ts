import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AbnormalConditionsFilters } from 'src/app/model/abnormal-conditions-filters';
import { AbnormalConditionsResponse } from 'src/app/model/abnormal-conditions-response';
import { Consulta } from 'src/app/model/consultas';
import { CountyNatalityFilterResidenceAndBirths } from 'src/app/model/county-natality-filter-residence-and-births';
import { CountyNatalityResponse } from 'src/app/model/county-natality-response';
import { ConsultasService } from 'src/app/service/consultas.service'
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';
import { Router } from '@angular/router';
import { CountyNatalitySearchResponse } from 'src/app/model/county-natality-search-response';
import { CountyNatalitySearchRequest } from 'src/app/model/county-natality-search-request';
import { CountyNatalityFilter } from 'src/app/model/county-natality-filter';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';
import { AbnormalFiltersResponse } from 'src/app/model/abnormal-filters-response';
import { CongenitalResponse } from 'src/app/model/congenital-response';
import { CongenitalFilters } from 'src/app/model/congenital-filters';
import { FatherRaceResponse } from 'src/app/model/father-race-response';
import { FatherRaceFilters } from 'src/app/model/father-race-filters';
import { MaternalMorbidityResponse } from 'src/app/model/maternal/maternal-morbidity-response';
import { MaternalMorbidityFilters } from 'src/app/model/maternal/maternal-morbidity-filters';
import { MotherRaceResponse } from 'src/app/model/motherRace/mother-race-response';
import { MotherRaceFilters } from 'src/app/model/motherRace/mother-race-filters';
import { PaymentResponse } from 'src/app/model/payment/payment-response';
import { PaymentFiltersResponse } from 'src/app/model/payment/payment-filters-response';
import { UptimeService } from 'src/app/service/uptime.service';



@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit{

  tableSize: number = 0;
  mostrarGrafico: boolean = false;
  mostrarGraficoColumnas: boolean = false;
  // Opciones para el año
  years: string[] = [
    '2018-01-01',
    '2017-01-01',
    '2016-01-01',

  ];

  // Opciones para el condado de residencia
  county_of_Residence: string[] = [
    'Calhoun County, AL',
    'Tulsa County, OK',
    'Carroll County, GA',
    'Saginaw County, MI',
    'Hillsborough County, FL',
    'Lake County, IN',
    'St. Tammany Parish, LA',
    'Osceola County, FL',
    'Sarpy County, NE',
    'Kane County, IL',
    'San Juan County, NM',
    'Douglas County, KS',
    'Denton County, TX',
    'Hays County, TX',
    'Davis County, UT',
    'Manatee County, FL',
    'New Haven County, CT',
    'San Mateo County, CA',
    'San Luis Obispo County, CA',
    'Canyon County, ID'
  ];


  // Variables para almacenar las selecciones
  selectedYear: string = "2018-01-01";
  selectedCounty : string = "Calhoun County, AL";

  userAdmin: string = '';

  showChart: boolean = false;
  consultaForm: FormGroup;
  countyNatalityData: CountyNatalityResponse [] = [];
  countyNatalityResidenceAndBirthsData: CountyNatalityFilterResidenceAndBirths[] = [];
  countyNatalityByAbnormalConditionsData: AbnormalConditionsResponse[] = [];
  abnormalConditionsFiltersData: AbnormalConditionsFilters[] = [];
  countySearchResponse:CountyNatalitySearchResponse[] = [];
  countyNatalityFilter!:CountyNatalityFilter;
  abnormalFilterResponse!:AbnormalFiltersResponse;
  congenitalResponse: CongenitalResponse[] = [];
  congenitalFilters!: CongenitalFilters;
  fatherRaceResponse: FatherRaceResponse[] = [];
  fatherRaceFilters!: FatherRaceFilters;
  maternalMorbidityResponse: MaternalMorbidityResponse[] = [];
  maternalMorbidityFilters!: MaternalMorbidityFilters;
  motherRaceResponse: MotherRaceResponse[] = [];
  motherRaceFilters!: MotherRaceFilters;
  paymentResponse: PaymentResponse[] = [];
  paymentFiltersResponse!: PaymentFiltersResponse;

  selectedOption: string = 'VAC'; // Esta propiedad almacena el valor seleccionado

constructor(private consultasService: ConsultasService, private fb: FormBuilder,
    private toastr: ToastrService, private sharedDataService: SharedDataServiceService,
    private router: Router, private sharedService: SharedDataCountyService, private upTimeService: UptimeService){
    this.consultaForm = this.fb.group({
      nameUser: ['', [Validators.required, Validators.email]],
      nameConsult: ['', [Validators.required]],
      comment: ['',[Validators.required]],
    });
}

// Función para manejar el clic en el botón
onButomCircular() {
  const county: CountyNatalitySearchRequest = {
    year: this.selectedYear,
    county_of_Residence: this.selectedCounty
  };
  this.consultasService.searchByYearAndResidence(county).subscribe(
    response =>{
      this.countySearchResponse = response;
      this.mostrarGrafico = true;
      console.log(response);
       // Envía los datos al servicio para que otros componentes puedan recibirlos
       this.sharedDataService.setData(this.countySearchResponse);
    },error =>{
      this.toastr.error('Error: ' + JSON.stringify(error));
      console.error('Error en la solicitud:', error);

    }
  )
  console.log('Año seleccionado:', this.selectedYear);
  console.log('Condado seleccionado:', this.selectedCounty);
}

onbutomColumClick(){
  const county: CountyNatalitySearchRequest = {
    year: this.selectedYear,
    county_of_Residence: this.selectedCounty
  };
  this.consultasService.searchByYearAndResidence(county).subscribe(
    response =>{
      this.countySearchResponse = response;
      this.mostrarGrafico = true;
      console.log(response);
       // Envía los datos al servicio para que otros componentes puedan recibirlos
       this.sharedDataService.setDataColumnas(this.countySearchResponse);
    },error =>{
      this.toastr.error('Error: ' + JSON.stringify(error));
      console.error('Error en la solicitud:', error);

    }
  )
  console.log('Año seleccionado:', this.selectedYear);
  console.log('Condado seleccionado:', this.selectedCounty);
}

ngOnInit() {
    this.sharedDataService.chartData$.subscribe(data => {
      // Actualizar lógica en respuesta a cambios en chartData
      console.log('Nuevos datos de gráfico recibidos:', data);
      // Lógica para actualizar el gráfico en respuesta a los nuevos datos
    });

    this.sharedDataService.chartCategories$.subscribe(categories => {
      // Actualizar lógica en respuesta a cambios en chartCategories
      console.log('Nuevas categorías de gráfico recibidas:', categories);
      // Lógica para actualizar el gráfico en respuesta a las nuevas categorías
    });
    this.tableSize = 0;
}

validarYEnviar() {
    if (this.userAdmin === 'admin@gmail.com') {
      // Navegar al inicio (puedes cambiar 'inicio' por la ruta que desees)
      this.router.navigate(['']);
    } else {
      alert('El usuario no es válido');
    }
}

clickButonGraficoColumnas(){
  this.countyNatalityData = [];
  if(this.selectedOption){
    switch(this.selectedOption){
      case 'NDC':
        this.consultasService.getCountyNatality().subscribe(data => {
          this.countyNatalityData = data;
          this.mostrarGraficoColumnas = true;
          console.log('Datos de clickButonGraficoColumnas():', data);
          this.sharedDataService.setDataGraficoColumnas(this.countyNatalityData);
        }, error => {
          this.toastr.error(error);
          console.error('Error en la consulta de Natalidad del Condado:', error);
        });
      break;
      default:

      break;
    }
  }
}

onButtonClick() {
    // Limpiar los arrays al seleccionar otra opción
    this.countyNatalityData = [];
    this.countyNatalityResidenceAndBirthsData = [];
    this.countyNatalityByAbnormalConditionsData = [];
    this.abnormalConditionsFiltersData = [];
    this.congenitalResponse = [];
    this.fatherRaceResponse = [];
    this.maternalMorbidityResponse = [];
    this.motherRaceResponse = [];
    this.paymentResponse = [];

    this.tableSize = 0;
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'NDC':
          this.consultasService.getCountyNatality().subscribe(data => {
            this.countyNatalityData = data;
            console.log('Datos de Natalidad del Condado:', data);
            this.tableSize = this.countyNatalityData.length;
          }, error => {
            this.toastr.error(error);
            console.error('Error en la consulta de Natalidad del Condado:', error);
          });
        break;
        case 'PRN':
          this.consultasService.getCountyNatalityResidenceAndBirths().subscribe(
            data => {
              this.countyNatalityResidenceAndBirthsData = data;
              console.log('Filtros por condado y nacimientos:', data);
            }, error => {
              console.error('Error en la consulta de Natalidad del Condado:', error);
            });

          break;
        case 'NCPCA':
          this.consultasService.getCountyNatalityByAbnormalConditions().subscribe(
            data => {
              this.countyNatalityByAbnormalConditionsData = data;
              console.log(' Nacimientos anomalos:', data);
              this.tableSize = this.countyNatalityByAbnormalConditionsData.length;
            },error => {
              console.error('Error en la consulta de nacimientos anomalos:', error);
            }
          )
          break;
        case 'CAE':
          this.consultasService.abnormalConditionsFilters().subscribe(
            data =>  {
              this.abnormalConditionsFiltersData = data;
              console.log('Filtros por coniciones anomalas:', data);
            },error =>{
              console.error('Error en la consulta filtros anomalos:', error);
            }
          )
        break;
        case 'NPACPC':
            this.consultasService.getAllCongenitalAbnormalities().subscribe(
              data =>{
                console.log("Datos de getAllCongenitalAbnormalities(): ", data);
                this.congenitalResponse = data;
                this.tableSize = this.congenitalResponse.length;
              },error => {
                console.log(error);
              }
            )
        break;
        case 'NPRDP':
          this.consultasService.getAllByFatherRace().subscribe(
            data => {
              console.log("Datos de getAllByFatherRace(): ", data);
              this.fatherRaceResponse = data;
              this.tableSize = this.fatherRaceResponse.length;
            },error => {
              console.log(error);
            }
          )
        break;
        case 'NPMMC':
            this.consultasService.getAllMaternalMorbidity().subscribe(
              data => {
                console.log("Datos de getAllMaternalMorbidity(): ", data);
                this.maternalMorbidityResponse = data;
                console.log("SIZE = ", this.maternalMorbidityResponse.length);
                this.tableSize = this.maternalMorbidityResponse.length;
              },error => {
                console.log(error);
              }
            )
        break;
        case 'NPRDLM':
              this.consultasService.getAllMotherRace().subscribe(
                data => {
                  console.log("Datos de getAllMotherRace(): ", data);
                  this.motherRaceResponse = data;
                  console.log("SIZE = ", this.motherRaceResponse.length);
                  this.tableSize = this.motherRaceResponse.length;
                },error => {
                  console.log(error);
                  this.toastr.error(error);
                }
              )
        break;
        case 'NPPSETDP':
                this.consultasService.getAllPayments().subscribe(
                  data => {
                    console.log(data);
                    this.paymentResponse = data;
                    this.tableSize = this.paymentResponse.length;
                    console.log("SIZE = ", this.paymentResponse.length);
                  },error => {
                    console.log(error);
                    this.toastr.error(error);
                  }
                )
        break;
        default:

          break;
      }
    }
}

noDataCondition(): boolean {
    return (
        (!this.selectedOption) ||
        (this.selectedOption === 'NDC' && (!this.countyNatalityData || this.countyNatalityData.length === 0)) ||
        (this.selectedOption === 'PRN' && (!this.countyNatalityResidenceAndBirthsData || this.countyNatalityResidenceAndBirthsData.length === 0)) ||
        (this.selectedOption === 'NCPCA' && (!this.countyNatalityByAbnormalConditionsData || this.countyNatalityByAbnormalConditionsData.length === 0)) ||
        (this.selectedOption === 'CAE' && (!this.abnormalConditionsFiltersData || this.abnormalConditionsFiltersData.length === 0)) ||
        (this.selectedOption === 'VAC')
    );
}

guardarConsulta() {
  // Marca todos los campos como tocados para activar las validaciones y mostrar mensajes de error
  if(this.getDataForConsulta().length === 0){
    this.toastr.error("Debes realizar una consulta para poder guardar la misma")
    this.consultaForm.reset();
  }else{
    if (this.consultaForm.valid) {
      const nuevaConsulta: Consulta = {
        nameUser: this.consultaForm.value.nameUser,
        nameConsult: this.consultaForm.value.nameConsult,
        comment: this.consultaForm.value.comment,
        countyNatalityBaseList: this.getDataForConsulta(), // Método para obtener datos de la consulta
      };

      this.consultasService.saveConsulta(nuevaConsulta).subscribe(
        (response) => {
          console.log('Consulta guardada con éxito', response);
          this.toastr.success(response.message);
          this.consultaForm.reset();
        },
        (error) => {
          console.error('Error al guardar la consulta', error);
          if (error === 'Este nombre de consulta para este usuario ya esta creada ') {
            // Manejar el error específico de conflicto (código 409)
            this.toastr.error(error);
            this.consultaForm.reset();
          } else {
            // Otros errores
            this.toastr.error('Error al guardar la consulta');
            this.consultaForm.reset();
          }
        }
      );
    }else{
      this.consultaForm.markAllAsTouched();
    }
  }


}

// Método para obtener los datos específicos de la consulta según la opción seleccionada
getDataForConsulta(): any[] {
  switch (this.selectedOption) {
    case 'NDC':
      return this.countyNatalityData;
    case 'PRN':
      return this.countyNatalityResidenceAndBirthsData;
    case 'NCPCA':
      return this.countyNatalityByAbnormalConditionsData;
    case 'CAE':
      return this.abnormalConditionsFiltersData;
    default:
      return [];
  }
}

onButtonGraficoClick() {
  // Limpiar los arrays al seleccionar otra opción
  this.countyNatalityData = [];
  this.countyNatalityResidenceAndBirthsData = [];
  this.countyNatalityByAbnormalConditionsData = [];
  this.abnormalConditionsFiltersData = [];
  // Limpiar datos en el servicio para reflejarlo en otros componentes
  this.sharedDataService.updateChartData([], []);
  if (this.selectedOption) {
    switch (this.selectedOption) {
      case 'NDC':
        this.consultasService.getCountyNatality().subscribe(
          (data) => {
            this.countyNatalityData = data;

            this.showChart = true;
            this.updateChartData();
            console.log('Datos de Natalidad del Condado:', data);
          },
          (error) => {
            console.error('Error en la consulta de Natalidad del Condado:', error);
          }
        );
      break;
      case 'PRN':
        this.consultasService.getCountyNatalityResidenceAndBirths().subscribe(
          (data) => {
            this.countyNatalityResidenceAndBirthsData = data;

            this.showChart = true;
            this.updateChartData();
            console.log('Datos de Natalidad del Condado:', data);
          },
          (error) => {
            console.error('Error en la consulta de Natalidad del Condado:', error);
          }
        );

      break;
      case 'NCPCA':
        this.consultasService.getCountyNatalityByAbnormalConditions().subscribe(
          (data) => {
            this.countyNatalityByAbnormalConditionsData = data;

            this.showChart = true;
            this.updateChartData();
            console.log('Datos de Natalidad del Condado:', data);
          },
          (error) => {
            console.error('Error en la consulta de Natalidad del Condado:', error);
          }
        );

      break;
      case 'CAE':
        this.consultasService.abnormalConditionsFilters().subscribe(
          (data) => {
            this.abnormalConditionsFiltersData = data;

            this.showChart = true;
            this.updateChartData();
            console.log('Datos de Natalidad del Condado:', data);
          },
          (error) => {
            console.error('Error en la consulta de Natalidad del Condado:', error);
          }
        );

      break;

    }
  }

}

series: { name: string; data: (number | null)[] }[] = [];
updateChartData() {
  if (this.selectedOption) {
    try {
      let categories: string[] = [];

      let data: any[] = [];

      switch (this.selectedOption) {
        case 'NDC':
          data = this.countyNatalityData;
          break;

        case 'PRN':
          data = this.countyNatalityResidenceAndBirthsData;
          break;

        case 'NCPCA':
          data = this.countyNatalityByAbnormalConditionsData;
          break;

        case 'CAE':
          data = this.abnormalConditionsFiltersData;
          break;

        default:
          break;
      }

      if (data && data.length > 0) {
        categories = Object.keys(data[0]);

        // Mapear los datos a un formato adecuado para el gráfico
        this.series = categories.map(category => {
          return {
            name: category,
            data: this.getDataForCategory(category, data)
          };
        });

        console.log("updateChartData()", categories);
        console.log("updateChartData()", this.series);
        this.sharedDataService.updateChartData(this.series, categories);
      }
    } catch (error) {
      console.error('Error al procesar los datos:', error);
    }
  }
}

getDataForCategory(category: string, data: any[]): (number | null)[] {
  // Implementa la lógica para obtener los datos específicos de la categoría según la opción seleccionada
  return data.map(item => {
    const value = isNaN(parseFloat(item[category])) ? null : parseFloat(item[category]);
    return value;
  });
}

abrirGrafico() {
  this.mostrarGrafico = true;
}

cerrarGrafico() {
  this.mostrarGrafico = false;
}

cerrarGraficoColumna(){
  this.mostrarGraficoColumnas = false;
}

mostrarGraficoRectangular(){
  console.log("Se apreto el boton mostrarGraficoRectangular()");
  if(this.selectedOption){
    switch(this.selectedOption){
      case 'NDC':
        if(this.countyNatalityData.length > 0){
          this.consultasService.getAllByYearAndBirths().subscribe(
            response =>{
              console.log(response);
              this.countyNatalityFilter = response;
              console.log(this.countyNatalityFilter);
              this.sharedService.setDataCountyFilter(this.countyNatalityFilter);
              this.router.navigate(['/consultas/nacimientos']);
            },error => {
              console.log(error);
              this.toastr.error(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }

      break;
      case 'NCPCA':
        if(this.countyNatalityByAbnormalConditionsData.length > 0){
          this.consultasService.getAllAbnormalNoCheckedUnknown().subscribe(
            response => {
              console.log(response);
              console.log("longitud = ", this.countyNatalityByAbnormalConditionsData.length);
              this.abnormalFilterResponse = response;
              ///this.sharedDataService.setDataAbnormalFilters(this.abnormalFilterResponse);
              this.sharedService.setDataAbnormalFilters(this.abnormalFilterResponse);
              this.router.navigate(['/consultas/abnormal']);
            },error => {
              console.log(error);
              this.toastr.error(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }
      break;
      case 'NPACPC':
        if(this.congenitalResponse.length > 0){
          this.consultasService.getAllCongenitalFilters().subscribe(
            data => {
              console.log("Datos de getAllCongenitalFilters(): ", data);
              this.congenitalFilters = data;
              this.sharedService.setDataCongenitalFilters(this.congenitalFilters);
              this.router.navigate(['/consultas/congenital']);
            },error => {
              console.log(error);
              this.toastr.error(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }
      break;
      case 'NPRDP':
        if(this.fatherRaceResponse.length > 0){
          this.consultasService.getFatherRaceFilters().subscribe(
            data => {
              this.fatherRaceFilters = data;
              this.sharedService.setdataFatherRaceFilters(this.fatherRaceFilters);
              this.router.navigate(['/consultas/father']);
            },error => {
              this.toastr.error(error);
              console.log(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }
      break;
      case 'NPMMC':
        if(this.maternalMorbidityResponse.length > 0){
          this.consultasService.getMaternalMorbidityFilters().subscribe(
            data => {
              this.maternalMorbidityFilters = data;
              this.sharedService.setDataMaternalFilters(this.maternalMorbidityFilters);
              this.router.navigate(['/consultas/maternal']);
            },error => {
              this.toastr.error(error);
              console.log(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }
      break;
      case 'NPRDLM':
        if(this.motherRaceResponse.length > 0){
          this.consultasService.getMotherRaceFilters().subscribe(
            data => {
              this.motherRaceFilters = data;
              this.sharedService.setDataMotherRaceFilters(this.motherRaceFilters);
              this.router.navigate(['/consultas/mother']);
            },error => {
              this.toastr.error(error);
              console.log(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }
      break;
      case 'NPPSETDP':
        if(this.paymentResponse.length > 0){
          this.consultasService.getPaymentFilters().subscribe(
            data => {
              this.paymentFiltersResponse = data;
              this.sharedService.setDataPaymentFilters(this.paymentFiltersResponse);
              this.router.navigate(['/consultas/payment']);
            },error => {
              this.toastr.error(error);
              console.log(error);
            }
          )
        }else{
          this.toastr.info("Debes realizar una busqueda para graficar");
        }
      break;

      default:
      break;
    }
  }
}


}





