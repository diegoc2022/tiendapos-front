import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VinculosService } from './services/vinculos.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-vinculos',
  standalone: false,
  templateUrl: './vinculos.component.html',
  styleUrl: './vinculos.component.scss'
})
export class VinculosComponent {

  @ViewChild('siguienteInput') siguienteInput?: ElementRef;
  @ViewChild('siguienteInput2') siguienteInput2?: ElementRef;
  fecha_actual?:string;
  date: Date = new Date();
  data: FormGroup = new FormGroup({});
  onChecked?:boolean;
  placeholder:string='Lea código nuevo';
  placeholder2:string='Lea código existente';
  codigosVinculos:any[]=[];

  constructor(
    private vinculos: VinculosService,   
    private messageService:MessageService,
    private fb: FormBuilder    
  ){}

  ngOnInit() {
    this.data = this.fb.group({
      codigoInic: [null , Validators.required],
      codigoVinc: [null , Validators.required],
      activaAsoc: [null , Validators.required]
    });
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm');            
  }

  funct_registra_vinculos_c(){      
      this.vinculos.funct_registra_vinculos_s(this.data.value).subscribe({
        next:data=>{
          const obj = JSON.stringify(data);
          const obj2 = JSON.parse(obj);
          if(obj2.code != 409) {               
            this.data.get('codigoVinc')?.setValue('');
            const nextElement = (document.querySelector(`[formControlName="codigoVinc"]`) as HTMLElement);
            nextElement.focus(); 
            this.messageService.add({ severity: 'success', summary: 'Advertencia:', detail: 'Vinculo creado exitosamente',life:3000}); 
          }else{        
            this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail: obj2.msg,life:3000});                   
          }      
        },error: error=>{
          this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail:error,life:3000});                              
        }
      })               
  }
  
  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const nextElement = (document.querySelector(`[formControlName="codigoVinc"]`) as HTMLElement);
      nextElement.focus();      
    }
  }

}
