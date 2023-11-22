import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SavedQueriesResponse } from 'src/app/model/saved-queries-response';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit{

  queriesResonses: SavedQueriesResponse[] = [];

  constructor(private consultService: ConsultasService, private toastr: ToastrService,
    private router: Router){}

  ngOnInit(): void {
    //this.loadConsults();
  }

  loadConsults(): void{
    this.consultService.getAllConsults().subscribe(
      response => {
        this.queriesResonses = response;
        console.log(response);
      },error => {
        console.log("Error al cargar consultas", error);
        this.toastr.error(error.message);
      }
    )
  }

  verTabla(consultaId: number): void {
    console.log('Ver Tabla - Consulta ID:', consultaId);
    this.router.navigate(['/consultas/buscar', consultaId]);

  }

}
