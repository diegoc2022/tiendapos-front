import { Component, ElementRef, ViewChild } from '@angular/core';
import { DownloadsService } from './services/downloads.service';
import { VinculosService } from '../vinculos/services/vinculos.service';
import { ProductosService } from '../productos/services/productos.service';
import { MessageService } from 'primeng/api';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-downloads',
  standalone: false,
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {
@ViewChild('progressBar') progressBar?: ElementRef;
data_productos:any[] = [];
data_vinculos:any[] = [];
porcentaje:number = 0 ;
total_productos:number = 0;
total_vinculos:number =0;
isCompleted:boolean = false;

 constructor(
  private services:DownloadsService, 
  private productos:ProductosService,
  private vinculos:VinculosService,
  private message: MessageService,
){}

  funct_descarga_productos_c(){ 
    this.total_productos =0;
    this.total_vinculos = 0;  
    this.data_productos = [];
    this.data_vinculos = [];
    this.services.funct_retona_productos_prod_s().subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);            
        for (let index = 0; index < obj.length; index++) {      
          this.total_productos++
          this.porcentaje = Math.floor((this.total_productos / obj.length) * 100);          
          this.data_productos.push(obj[index]);          
          if (this.progressBar) {
            this.progressBar.nativeElement.style.width = `${this.porcentaje}%`;
            this.progressBar.nativeElement.setAttribute('aria-valuenow', this.porcentaje);
            this.progressBar.nativeElement.textContent = `${this.porcentaje}%`;
          }                       
        }
        
        this.services.funct_retorna_vinculos_prod_s().subscribe({
          next:data=>{
            const objData = JSON.stringify(data);
            const obj = JSON.parse(objData);  
            for (let index = 0; index < obj.length; index++) {
              this.data_vinculos.push(obj[index]);
              this.total_vinculos++
            }               
          }
          
        })
        
      }
    })
  }

  funct_actualiza_data_c(){
    Swal.fire({
        title: '¡Avertencia!',
        text: 'Este proceso eliminará todos los productos y registrtros asociados para luego insertarlos ¿Está seguro de hacerlo? ',
        icon: 'warning',
        width:'400px',               
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor:'#3085d6',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Ignorar',          
        } as SweetAlertOptions).then((result) => {
          if (result.value) {
            this.isCompleted = true; 
            this.vinculos.funct_elimina_vinculos_s().subscribe({
              next:data=>{             
                  this.productos.funct_elimina_productos_s().subscribe({
                    next:data=>{                                                         
                        this.productos.funct_inserta_productos_masivo_s(this.data_productos).subscribe({
                          next:data =>{
                            const objData = JSON.stringify(data);
                            const obj = JSON.parse(objData);
                            if (obj > 0) {
                              this.vinculos.funct_inserta_vinculos_masivos_s(this.data_vinculos).subscribe({
                                next:data=>{
                                  const objData = JSON.stringify(data);
                                  const obj = JSON.parse(objData); 
                                  if (obj > 0) {
                                    this.data_productos =[];
                                    this.data_vinculos = [];
                                    this.total_productos = 0;
                                    this.total_vinculos = 0;
                                    this.isCompleted = false;
                                    this.funct_ejecuta_dialog();
                                  }
  
                                }
                              })
                            }                          
                          }
                        })                                       
                      }
                   })                                        
                }
            })            
          }
      });
  }

  funct_ejecuta_dialog(){
    Swal.fire({
      title: '¡Éxito!',
      text: 'Tu operación fue completada con éxito. Por favor verifica, haciendo lecturas en la pantalla de facturación',
      icon: 'success',
      width:'300px',
      confirmButtonText: 'Aceptar',
      background: '#0d6efd',
      color:'#FFF',
    });
  }
}
