
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminRequest } from 'src/app/model/admin-request';
import { ConsultasService } from 'src/app/service/consultas.service';
import { SharedDataCountyService } from 'src/app/service/shared-data-county.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  adminForm: FormGroup;
  userAdmin: string = "";
  //userAdmin: AdminRequest = { userAdmin: '' };
  constructor(private consultService:ConsultasService, private toastr: ToastrService,
    private router: Router, private fb: FormBuilder, private sharedService: SharedDataCountyService){
      this.adminForm = fb.group({
        userAdmin:['', [Validators.required, Validators.email]]
      })
    }

  enviarSolicitud() {

    if(this.adminForm.valid){
      const userAdmin: AdminRequest = {
        userAdmin: this.adminForm.value.userAdmin
      };
      this.consultService.loginAdmin(userAdmin).subscribe(
        (response) => {
          console.log('Éxito:', response);
          this.toastr.success(response.message);
          this.userAdmin = "Abel123";
          this.sharedService.setDataUserAdmin(this.userAdmin);
          this.adminForm.reset();
        setTimeout(() => {
          this.router.navigate(['/natalidad']);
        }, 1000);
        },
        (error) => {
          console.error('Error:', error);
          this.toastr.error(error);

        }
      );
    }else{
      this.adminForm.markAsTouched();
      this.toastr.warning("Ingresa el admin para iniciar la app.  ️");

    }

  }

}
