import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { max } from 'd3';
import { ToastrService } from 'ngx-toastr';
import { CommentResponse } from 'src/app/model/comment-response';
import { ConsultaDetalleResponse } from 'src/app/model/consulta-detalle-response';
import { CountyNatalityResponse } from 'src/app/model/county-natality-response';
import { CountySearchIdResponse } from 'src/app/model/county-search-id-response';
import { ConsultasService } from 'src/app/service/consultas.service';
import { CountyNatalityServiceService } from 'src/app/service/county-natality-service.service';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

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
  pageSize: number = 50;
  currentPage: number = 1;
  commentResponseList!: CommentResponse[];
  contadorMessage!: number;
  countyNatalitySearchIdResponse!: CountySearchIdResponse;
  mostrarGrafico: boolean = false;
  //Comment
  currentPageComment = 1;
  commentsPerPage = 3;

  constructor(private route: ActivatedRoute, private consultService:ConsultasService,
    private formBuilder: FormBuilder, private toastr: ToastrService, private countyService:CountyNatalityServiceService,
    private sharedService: SharedDataCountyService, private router: Router ){

    this.comentarioForm = this.formBuilder.group({
      nameUser: ['', [Validators.required, Validators.email]],
      comment: ['', [Validators.required, Validators.maxLength(150)]],
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
    this.countyService.getByIdCountyNatality(id).subscribe(
      response =>{
        // Agregar un valor a la lista usando el operador de propagación
        this.countyNatalitySearchIdResponse = response;
        this.mostrarGrafico = true;
        console.log("Response de graficar en search-component", this.countyNatalitySearchIdResponse);
        this.sharedService.setDataSearchId(this.countyNatalitySearchIdResponse);
        //this.router.navigate(['/consultas/search-id']);
      },error => {
        console.log(error);

      }
    )
  }

loadConsultaDetalle(): void {
    this.consultService.getConsultaDetails(this.consultaId).subscribe(
      (data) => {
        this.consultaDetalle = data;
        this.commentResponseList = data[0].commentResponseList;
        console.log("Size = ",this.consultaDetalle.length);
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

cerrarGrafico() {
  this.mostrarGrafico = false;
}

get totalItems(): number {
  return this.consultaDetalle.length;
}

get totalPages(): number {
  return Math.ceil(this.totalItems / this.pageSize);
}

// Función para obtener los elementos de la página actual
getItems(): ConsultaDetalleResponse[] {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.consultaDetalle.slice(startIndex, endIndex);
}

// Método para avanzar y retroceder
goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

goToNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

//Comment
getCommentsForPage(): CommentResponse[] {
  const startIndex = (this.currentPageComment - 1) * this.commentsPerPage;
  return this.commentResponseList.slice(startIndex, startIndex + this.commentsPerPage);
}


}
