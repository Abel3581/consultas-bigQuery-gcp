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



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000, // Duración predeterminada del toast en milisegundos
      positionClass: 'toast-top-right', // Posición del toast
      preventDuplicates: true, // Evitar duplicados
    }),
     ToastNoAnimationModule,
    // ToastNoAnimationModule,
    // NgApexchartsModule,
    // ToastrModule.forRoot({
    //   timeOut: 3000, // Duración predeterminada del toast en milisegundos
    //   positionClass: 'toast-top-right', // Posición del toast

    // }),


  ],


  providers:[ConsultasService, SharedDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
