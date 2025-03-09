import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',  
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private loginService: LoginService,
  
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      passw: ['', Validators.required]      
    });    
  }

  funct_retorna_usuarios_c() {    
  if (this.formLogin.invalid) {
    this.formLogin.markAllAsTouched();
    for (const key in this.formLogin.controls) {
      this.formLogin.controls[key].markAsDirty();
    }
    return;
  }
  
  this.loginService.funct_retorna_usuarios_s(this.formLogin.value).subscribe({
    next:data=>{
      const myObj = JSON.stringify(data);
      const dataObj = JSON.parse(myObj);      
      if (dataObj.status == 200) {
        localStorage.setItem('user',dataObj.result.user); 
        localStorage.setItem('token',dataObj.token);            
        this.router.navigate(['/menu']); 
      }else{
        Swal.fire({
          title: 'Error:',
          width:'300px',        
          text: 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          background: '#cb4335',
          color:'#FFF',
        });   
      }     
    },error:err=>{
      if (err.status === 0) {        
        Swal.fire({
          title: 'Error de conexión',
          width: '300px',        
          text: 'No se pudo conectar al servidor.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          background: '#cb4335',
          color: '#FFF',
        });
      }
    }   
  })    
}

onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {      
      const nextElement = (document.querySelector(`[formControlName="passw"]`) as HTMLElement);
      nextElement.focus();
    }
  }
  
}
