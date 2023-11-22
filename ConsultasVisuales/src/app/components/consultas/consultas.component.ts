import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApexOptions } from 'ng-apexcharts';
import { ToastrService } from 'ngx-toastr';
import { AbnormalConditionsFilters } from 'src/app/model/abnormal-conditions-filters';
import { AbnormalConditionsResponse } from 'src/app/model/abnormal-conditions-response';
import { Consulta } from 'src/app/model/consultas';
import { CountyNatalityFilterResidenceAndBirths } from 'src/app/model/county-natality-filter-residence-and-births';
import { CountyNatalityResponse } from 'src/app/model/county-natality-response';
import { ConsultasService } from 'src/app/service/consultas.service'
import { SharedDataServiceService } from 'src/app/service/shared-data-service.service';
import { GraficasComponent } from '../graficas/graficas.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit{
  userAdmin: string = '';

  showChart: boolean = false;
  consultaForm: FormGroup;
  countyNatalityData: CountyNatalityResponse [] = []; // Inicializamos como arreglo vacío
  countyNatalityResidenceAndBirthsData: CountyNatalityFilterResidenceAndBirths[] = [];
  countyNatalityByAbnormalConditionsData: AbnormalConditionsResponse[] = [];
  abnormalConditionsFiltersData: AbnormalConditionsFilters[] = [];

  selectedOption: string = ''; // Esta propiedad almacena el valor seleccionado


  constructor(private consultasService: ConsultasService, private fb: FormBuilder,
    private toastr: ToastrService, private sharedDataService: SharedDataServiceService,
    private router: Router){
    this.consultaForm = this.fb.group({
      nameConsult: ['', [Validators.required]],
      nameUser: ['', Validators.required],
      comment: [''],
    });
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
  }

  validarYEnviar() {
    if (this.userAdmin === 'admin@gmail.com') {
      // Navegar al inicio (puedes cambiar 'inicio' por la ruta que desees)
      this.router.navigate(['']);
    } else {
      alert('El usuario no es válido');
    }
  }

  onButtonClick() {
    // Limpiar los arrays al seleccionar otra opción
    this.countyNatalityData = [];
    this.countyNatalityResidenceAndBirthsData = [];
    this.countyNatalityByAbnormalConditionsData = [];
    this.abnormalConditionsFiltersData = [];
    if (this.selectedOption) {
      switch (this.selectedOption) {
        case 'NDC':
          this.consultasService.getCountyNatality().subscribe(data => {
            this.countyNatalityData = data;
            console.log('Datos de Natalidad del Condado:', data);


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
  if (this.consultaForm.valid) {
    const nuevaConsulta: Consulta = {
      nameConsult: this.consultaForm.value.nameConsult,
      nameUser: this.consultaForm.value.nameUser,
      comment: this.consultaForm.value.comment,
      countyNatalityBaseList: this.getDataForConsulta(), // Método para obtener datos de la consulta
    };

    this.consultasService.saveConsulta(nuevaConsulta).subscribe(
      (response) => {
        console.log('Consulta guardada con éxito', response);
        this.toastr.success(response.message);
      },
      (error) => {
        console.error('Error al guardar la consulta', error);
        this.toastr.error('Error al guardar consulta');
      }
    );
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
      categories = [];
      switch (this.selectedOption) {
        case 'NDC':
          if (this.countyNatalityData && this.countyNatalityData.length > 0) {
            categories = Object.keys(this.countyNatalityData[0]);
            // Lógica específica para la opción 'NDC'
          }
          break;

        case 'PRN':
          if (this.countyNatalityResidenceAndBirthsData && this.countyNatalityResidenceAndBirthsData.length > 0) {
            categories = Object.keys(this.countyNatalityResidenceAndBirthsData[0]);
            // Lógica específica para la opción 'PRN'


          }
          break;
        case 'NCPCA':
          if (this.countyNatalityByAbnormalConditionsData && this.countyNatalityByAbnormalConditionsData.length > 0) {
            categories = Object.keys(this.countyNatalityByAbnormalConditionsData[0]);
            // Lógica específica para la opción 'PRN'
          }
        break;
        case 'CAE':
          if (this.abnormalConditionsFiltersData && this.abnormalConditionsFiltersData.length > 0) {
            categories = Object.keys(this.abnormalConditionsFiltersData[0]);
            // Lógica específica para la opción 'PRN'
          }
        break;


        default:
          break;
      }

      // Mapear los datos a un formato adecuado para el gráfico
      this.series = categories.map(category => {
        return {
          name: category,
          data: this.getDataForCategory(category)
        };
      });

      console.log("updateChartData()", categories);
      console.log("updateChartData()", this.series);
      this.sharedDataService.updateChartData(this.series, categories);
    } catch (error) {
      console.error('Error al procesar los datos:', error);
    }
  }
}

getDataForCategory(category: string): (number | null)[] {
  // Implementa la lógica para obtener los datos específicos de la categoría según la opción seleccionada

  switch (this.selectedOption) {
    case 'NDC':
      return this.countyNatalityData.map(item => {
        const value = isNaN(parseFloat(item[category])) ? null : parseFloat(item[category]);
        return value;
      });

    case 'PRN':
      // Agrega la lógica para la opción 'PRN'
      return this.countyNatalityResidenceAndBirthsData.map(item => {
        const value = isNaN(parseFloat(item[category])) ? null : parseFloat(item[category]);
        return value;
      });

    // Agrega más casos según sea necesario para otras opciones
    case 'NCPCA':
      return this.countyNatalityByAbnormalConditionsData.map(item => {
        const value = isNaN(parseFloat(item[category])) ? null : parseFloat(item[category]);
        return value;
      });
      case 'CAE':
        return this.abnormalConditionsFiltersData.map(item => {
          const value = isNaN(parseFloat(item[category])) ? null : parseFloat(item[category]);
          return value;
        });

    default:
      return [];
  }
}


}





