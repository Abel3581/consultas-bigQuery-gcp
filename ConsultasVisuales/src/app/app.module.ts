import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { ConsultasService } from './service/consultas.service';
import { SharedDataServiceService } from './service/shared-data-service.service';
import { FooterComponent } from './shared/footer/footer.component';
import { CountyNatalityServiceService } from './service/county-natality-service.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderInterceptor } from './interceptor/ngx-ui-loader.interceptor';
import { UptimeService } from './service/uptime.service';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,




  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
       timeOut: 2000, // Duración predeterminada del toast en milisegundos
      // positionClass: 'toast-top-right', // Posición del toast
      // preventDuplicates: false, // Evitar duplicados
    }),
     ToastNoAnimationModule,
     // Import NgxUiLoaderModule
    NgxUiLoaderModule,
    NgxPaginationModule


  ],
  exports:[ ],


  providers:[{provide: HTTP_INTERCEPTORS,useClass: NgxUiLoaderInterceptor,multi:true},ConsultasService, SharedDataServiceService, CountyNatalityServiceService, UptimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
