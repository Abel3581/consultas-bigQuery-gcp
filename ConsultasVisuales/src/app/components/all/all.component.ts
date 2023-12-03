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
        if(response.length === 0){
          this.toastr.warning("No hay consultas guardadas");
        }
      },error => {
        console.log("Error al cargar consultas", error);
        this.toastr.error(error.message);
      }
    )
  }

  verTabla(consultaId: number, nameConsult: string): void {
    console.log('Ver Tabla - Consulta ID:', consultaId, + " Nombre consulta" + nameConsult);
    this.router.navigate(['/consultas/buscar'],{
      queryParams: {
        id: consultaId,
        nameConsult: nameConsult
      }
    });

  }

}
