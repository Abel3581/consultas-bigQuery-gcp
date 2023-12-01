import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nameUser: ['', [Validators.required, Validators.email]],
      //nameConsult: '',
      comment: ['', Validators.required],
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
  console.log("Se apreto el boton enviar comentario")
  this.comentarioForm.markAllAsTouched();
  if(this.consultaId && this.comentarioForm.valid){
    const id = this.consultaId; // Asegúrate de obtener el ID correcto
    console.log("El id ingresado es: " + id);
    const comentario = {
      nameUser: this.comentarioForm.value.nameUser,
      comment: this.comentarioForm.value.comment
    };

    this.consultService.createComment(id, comentario).subscribe(

      response => {
        console.log('Comentario creado exitosamente', response);
        this.toastr.success(response.message);
        this.comentarioForm.reset();
      },
      error => {

        if(error.status === 404){
          this.toastr.error("El usuario y comentario son obligatoros");
          this.comentarioForm.reset();
        }
        console.error('Error al crear el comentario con id:' + id , error);
        this.toastr.error('Error al crear comentario',error);
        this.comentarioForm.reset();
      }
    );
  }

}


}
