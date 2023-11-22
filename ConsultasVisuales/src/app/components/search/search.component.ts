import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConsultaDetalleResponse } from 'src/app/model/consulta-detalle-response';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  comentarioForm: FormGroup;
  consultaId!: number;
  consultaDetalle: ConsultaDetalleResponse[] = [];
  constructor(private route: ActivatedRoute, private consultService:ConsultasService,
    private formBuilder: FormBuilder, private toastr: ToastrService ){

    this.comentarioForm = this.formBuilder.group({
      nameUser: '',
      //nameConsult: '',
      comment: '',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.consultaId = +params['id'];
      this.loadConsultaDetalle();
    });
  }

  loadConsultaDetalle(): void {
    this.consultService.getConsultaDetails(this.consultaId).subscribe(
      (data) => {
        this.consultaDetalle = data;
      },
      (error) => {
        console.error('Error fetching consulta details', error);
      }
    );
  }

// En tu componente.ts
showColumn(columnName: string): boolean {
  return this.consultaDetalle.some(detalle => detalle[columnName] !== null && detalle[columnName] !== undefined && detalle[columnName] !== '');
}

enviarComentario() {
  const id = this.consultaId; // Asegúrate de obtener el ID correcto
  const comentario = {
    nameUser: this.comentarioForm.value.nameUser,
    comment: this.comentarioForm.value.comment
  };

  this.consultService.createComment(id, comentario).subscribe(
    response => {
      console.log('Comentario creado exitosamente', response);
      this.toastr.success("Comentario guardado")
      // Puedes realizar acciones adicionales después de crear el comentario, si es necesario
    },
    error => {
      console.error('Error al crear el comentario', error);
      this.toastr.error('Error al crear comentario',error);
      // Puedes manejar el error según tus necesidades
    }
  );
}


}
