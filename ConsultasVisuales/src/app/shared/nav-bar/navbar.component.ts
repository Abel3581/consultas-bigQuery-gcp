import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  navbarColorClass = 'bg-[#64c7f2]';
  user: string = "";
  urlConsultas: boolean = false;
  constructor(private router: Router, private sharedService: SharedDataCountyService) {}

  ngOnInit() {
    // Obtén la ruta actual
    const rutaActual = this.router.url;
    // Decide el color del navbar según la ruta actual
    if (rutaActual.includes(' ')) {
      this.navbarColorClass = this.navbarColorClass;
      this.urlConsultas = false;
    } else if (rutaActual.includes('/natalidad')) {
      this.navbarColorClass = 'bg-[#bef264]';
      this.urlConsultas = true;
    }else if (rutaActual.includes('/todos')) {
      this.navbarColorClass = 'bg-[#fecaca]';
      this.urlConsultas = true;
    }else if (rutaActual.includes('/buscar')) {
      this.navbarColorClass = 'bg-[#d8b4fe]';
      this.urlConsultas = true;
    }

    this.sharedService.dataUserAdmin$.subscribe(data => {
      console.log("Datos de userAdmin despues de emitir: ", data);
      this.user = data;
    })

  }

}
