import { Component } from '@angular/core';
import { VentasService } from '../ventas/services/ventas.service';
import { InventarioService } from '../inventario/services/inventario.service';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-exportar',
  standalone: false,
  templateUrl: './exportar.component.html',
  styleUrl: './exportar.component.scss'
})
export class ExportarComponent {
  selectedProduct1?:any[];
  products: any[]=[];

  constructor(
    private ventas: VentasService,
    private inventario:InventarioService,
    private message: MessageService
  ){}

  ngOnInit() {
    this.funct_retorna_ventas_c();
  }

  funct_retorna_ventas_c(){
    this.ventas.funct_retorna_all_s().subscribe({
      next:data=>{
      const objData = JSON.stringify(data);
      const obj = JSON.parse(objData);     
      this.products = [];
      for (let index = 0; index < obj.length; index++) {
        if (obj[index].estado == 'cerrado1') {             
              this.products.push(obj[index]);             
          } 
        } 
      }
    })
  }

  funct_actualiza_ventas_inventario_c(){
    Swal.fire({
        title: 'Está seguro?',
        text: 'que desea actualizar el inventario en la nube',
        icon: 'warning',
        width:'330px',     
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
        } as SweetAlertOptions).then((result) => {
          if (result.value) {
              setTimeout(()=>{
                this.inventario.funct_actualiza_existencia_inventario_s(this.products).subscribe({
                  next:data=>{
                    this.message.add({severity:'success', summary: 'Successful', detail: 'Inventario actualizado correctamente'});                   
                  }
                })     
              },1000)         
          }
      });      
  }

  funct_migra_ventas_historicos_en_la_nube_c(){
    Swal.fire({
        title: 'Está seguro?',
        text: 'que desea migrar estos registros para ventas historicos en la nube',
        icon: 'warning',
        width:'330px',     
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
        } as SweetAlertOptions).then((result) => {
          if (result.value) {
              setTimeout(()=>{
                this.ventas.funct_registra_ventas_historicos_s(this.products).subscribe({
                  next:data=>{
                    this.ventas.funct_elimina_ventas_temporal_s().subscribe({
                      next:data=>{
                        this.funct_retorna_ventas_c();
                        this.message.add({severity:'success', summary: 'Successful', detail: 'Registros migrados exitosamente'}); 
                      }
                    })                                     
                  }
                }) 
              },1000)         
          }
      });      
  }
}
