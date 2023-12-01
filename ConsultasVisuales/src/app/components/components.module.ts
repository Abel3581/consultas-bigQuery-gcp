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
import { AppModule } from '../app.module';
import { NavbarComponent } from '../shared/nav-bar/navbar.component';




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
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ComponentRoutingModule,
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule,
    NgApexchartsModule,
    ToastrModule.forRoot({
      timeOut: 2000, // Duración predeterminada del toast en milisegundos
      positionClass: 'toast-top-right', // Posición del toast

    }),


  ],providers:[ConsultasService, SharedDataServiceService]
})
export class ComponentsModule { }
