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




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,



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

  ],
  exports:[],


  providers:[ConsultasService, SharedDataServiceService, CountyNatalityServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
