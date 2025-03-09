import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreciosService } from './services/precios.service';
import { MessageService } from 'primeng/api';
import { VinculosService } from '../vinculos/services/vinculos.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-precios',
  standalone: false,
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {

  data: FormGroup = new FormGroup({});
  @ViewChild('codigo') codigo?: ElementRef;
  @ViewChild('precio') precio?: ElementRef;
  codigo_prod?:string;
  fecha_actual?:string;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder,   
    private vinculos:VinculosService,
    private editar: PreciosService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.data = this.fb.group({
      codigo:[null , Validators.required],
      precio:[null , Validators.required]
    });
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm'); 
  }

  onEnterPressed(event: KeyboardEvent) {
    this.codigo_prod='';
    if (event.key === 'Enter') { 
      this.vinculos.funct_retorna_vinculos_s(this.data.value.codigo).subscribe({
        next:data=>{ 
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);                                              
          this.codigo_prod=obj[0].producto.codProd;
          this.precio?.nativeElement.focus();
        }
      })      
    }
  }

  funct_edita_precios_c(){     
    this.editar.funct_edita_precios_s(this.codigo_prod,this.data.value).subscribe({
      next:data=>{        
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Precio editado correctamente'});            
      }
    });
     
  }
  
}
