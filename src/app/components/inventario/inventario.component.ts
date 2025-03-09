import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VinculosService } from '../vinculos/services/vinculos.service';
import { InventarioService } from './services/inventario.service';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  data: FormGroup = new FormGroup({});
  @ViewChild('codigo') codigo?: ElementRef;
  @ViewChild('cantidad') cantidad?: ElementRef;
  codigo_prod?:string;
  fecha_actual?:string;
  date: Date = new Date();

  constructor(
    private fb: FormBuilder,   
    private vinculos:VinculosService,
    private editar: InventarioService,
    private message: MessageService
  ){}

  ngOnInit(): void {
    this.data = this.fb.group({
      codigo:[null , Validators.required],
      cantidad:[null , Validators.required]
    });
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm'); 
  }

 
  funct_edita_cantidad_c(){     
    this.editar.funct_edita_cantidad_s(this.codigo_prod,this.data.value).subscribe({
      next:data=>{        
        this.message.add({severity:'success', summary: 'Successful', detail: 'Cantidad editada correctamente'});            
      }
    });
     
  }

  onEnterPressed(event: KeyboardEvent) {
    this.codigo_prod='';
    if (event.key === 'Enter') { 
      this.vinculos.funct_retorna_vinculos_s(this.data.value.codigo).subscribe({
        next:data=>{ 
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);                                            
          this.codigo_prod=obj[0].producto.codProd
          this.cantidad?.nativeElement.focus();
        }
      })      
    }
  }
}
