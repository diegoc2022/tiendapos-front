import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-sesion',
  standalone: false,
  templateUrl: './sesion.component.html',
  styleUrl: './sesion.component.scss'
})
export class SesionComponent {

  constructor(     
    private router: Router,
  ){}

  funct_termina_sesion_c(){
    Swal.fire({
      title: 'Está seguro?',
      text: 'que desea cerrar sesión',
      icon: 'warning',
      width:'330px',     
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
          localStorage.removeItem('token'); 
          localStorage.removeItem('user');
          localStorage.removeItem('opencaja');
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1000)         
      }
    }); 
    
  }
    
}
