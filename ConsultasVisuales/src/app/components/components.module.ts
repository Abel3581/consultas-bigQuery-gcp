import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasComponent } from './graficas/graficas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ComponentRoutingModule } from './component.routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasService } from '../service/consultas.service';
import { SearchComponent } from './search/search.component';
import { AllComponent } from './all/all.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedDataServiceService } from '../service/shared-data-service.service';
import { GraficoCircularComponent } from './grafico-circular/grafico-circular.component';
import { DistributedColumnsComponent } from './distributed-columns/distributed-columns.component';
import { NavbarComponent } from '../shared/nav-bar/navbar.component';
import { GraficoSearchIdComponent } from './grafico-search-id/grafico-search-id.component';
import { CountyNatalityServiceService } from '../service/county-natality-service.service';
import { NacimientosPorAnoComponentComponent } from './nacimientos-por-ano-component/nacimientos-por-ano-component.component';




@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    GraficasComponent,
    ConsultasComponent,
    AdminComponent,
    SearchComponent,
    AllComponent,
    GraficoCircularComponent,
    DistributedColumnsComponent,
    NavbarComponent,
    GraficoSearchIdComponent,
    NacimientosPorAnoComponentComponent

  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ComponentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule,
    ToastrModule.forRoot({
      timeOut: 1000, // Duración predeterminada del toast en milisegundos
      positionClass: 'toast-top-right', // Posición del toast

    }),


  ],providers:[ConsultasService, SharedDataServiceService, CountyNatalityServiceService]
})
export class ComponentsModule { }
