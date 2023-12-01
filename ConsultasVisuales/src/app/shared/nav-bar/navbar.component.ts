import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  navbarColorClass = 'bg-[#64c7f2]';

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtén la ruta actual
    const rutaActual = this.router.url;

    // Decide el color del navbar según la ruta actual
    if (rutaActual.includes(' ')) {
      this.navbarColorClass = this.navbarColorClass; // Cambia a tu clase de color para el componente uno
    } else if (rutaActual.includes('/natalidad')) {
      this.navbarColorClass = 'bg-[#bef264]'; // Cambia a tu clase de color para el componente dos
    }else if (rutaActual.includes('/todos')) {
      this.navbarColorClass = 'bg-[#fecaca]';
    }else if (rutaActual.includes('/buscar')) {
      this.navbarColorClass = 'bg-[#d8b4fe]';
    }

  }

}
