import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { AdminRequest } from 'src/app/model/admin-request';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  userAdmin: AdminRequest = { userAdmin: '' };
  constructor(private consultService:ConsultasService, private toastr: ToastrService,
    private router: Router){}

  enviarSolicitud() {

    this.consultService.loginAdmin(this.userAdmin).subscribe(
      (response) => {
        console.log('Éxito:', response);
        this.toastr.success(response.message);
        // Esperar 3 segundos antes de redireccionar
      setTimeout(() => {
        this.router.navigate(['/natalidad']);
      }, 3000);
      },
      (error) => {
        console.error('Error:', error);
        this.toastr.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error
      }
    );
  }

}
