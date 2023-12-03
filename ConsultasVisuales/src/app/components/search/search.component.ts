import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentResponse } from 'src/app/model/comment-response';
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
  nameConsult!: string;
  consultaDetalle: ConsultaDetalleResponse[] = [];
  commentResponseList!: CommentResponse[];
  contadorMessage!: number;


  constructor(private route: ActivatedRoute, private consultService:ConsultasService,
    private formBuilder: FormBuilder, private toastr: ToastrService ){

    this.comentarioForm = this.formBuilder.group({
      nameUser: ['', [Validators.required, Validators.email]],
      //nameConsult: '',
      comment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.consultaId = +queryParams['id'];
      this.nameConsult = queryParams['nameConsult'];
      this.loadConsultaDetalle();
    });
    console.log(this.consultaId, this.nameConsult)
  }

  graficar(id: number){
    console.log(id);
  }

  loadConsultaDetalle(): void {
    this.consultService.getConsultaDetails(this.consultaId).subscribe(
      (data) => {
        this.consultaDetalle = data;
        this.commentResponseList = data[0].commentResponseList;
        //console.log(data);
        //console.log(data[0]); // Muestra el primer elemento en la consola
        console.log(data[0].commentResponseList); // Muestra commentResponseList del primer elemento en la consola
        this.contadorMessage = this.commentResponseList.length;
      },
      (error) => {
        this.toastr.error(error);
        console.error('Error fetching consulta details', error);
      }
    );
  }


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
        this.loadConsultaDetalle();
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
