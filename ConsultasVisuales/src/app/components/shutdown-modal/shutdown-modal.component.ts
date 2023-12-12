import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminRequest } from 'src/app/model/admin-request';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-shutdown-modal',
  templateUrl: './shutdown-modal.component.html',
  styleUrls: ['./shutdown-modal.component.css']
})
export class ShutdownModalComponent {

  @Output() closeModal = new EventEmitter();
  password: string = "";
  constructor(private consultasService: ConsultasService, private router:Router,
    private tostr: ToastrService){}

  onNoClick(): void {
    // Cierra el modal sin realizar ninguna acción
    this.closeModal.emit();
  }

  onShutdownClick(): void {
    // Puedes agregar la lógica de apagar la aplicación aquí
    const request: AdminRequest  = {  userAdmin : this.password };
    this.consultasService.loginAdmin(request).subscribe(
      data => {
        console.log(data);
        console.log("Apagando app")
        this.tostr.success("Apagando app")
        this.router.navigate(['/consultas']);
      },error =>{
        console.log(error);
        this.tostr.error(error);
      }
    )
    // Cierra el modal después de realizar la acción
    this.closeModal.emit();
  }
}
