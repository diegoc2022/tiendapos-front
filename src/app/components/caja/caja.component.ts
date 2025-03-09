import { Component } from '@angular/core';
import { CuadreCajaService } from '../imprimir/services/cuadre.service';
import { VentasService } from '../ventas/services/ventas.service';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { link } from 'fs';

@Component({
  selector: 'app-caja',
  standalone: false,
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.scss'
})
export class CajaComponent {
  
  ventasProductos: any[]=[];  
  venta_total:number = 0;
  total_efectivo:number =0;
  total_cambio:number =0;
  idCaja:number=0;
  form_fecha:Date = new Date();
  fecha_actual?:string;
  ventasData:any[] =[];
  total_varios:number =0;
  base_caja:number =0;
  total_ventas_dia:any[] = [];
  otras_ventas:number =0;
  date: Date = new Date();
  
  constructor(
    private ventas:VentasService,    
    private cuadreCaja:CuadreCajaService,
    private router: Router 
  ){}


  ngOnInit(): void {
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm');      
  }
  
 
  funct_retorna_ventas_c(){
    this.ventas.funct_retorna_all_s().subscribe({
      next:data=>{
      const objData = JSON.stringify(data);
      const obj = JSON.parse(objData);        
      this.ventasData.length = 0; 
      this.total_ventas_dia.length = 0,
      this.total_varios =0; 
      this.otras_ventas = 0;      
      for (let index = 0; index < obj.length; index++) {         
        this.ventasData.push(obj[index]);         
        if (obj[index].codProd == 'OV100' || obj[index].codProd == 'F100') {
          this.otras_ventas += obj[index].subtotal
        }else{
          this.total_varios += obj[index].subtotal 
        }        
      }
      this.total_ventas_dia.push({
          total:this.total_varios,
          base:this.base_caja,
          otrasv:this.otras_ventas,
          fecha:this.fecha_actual
        })        
      }
    })
  }

  funct_imprime_cuadre_de_caja_c(){
    this.funct_retorna_ventas_c();      
    setTimeout(()=>{        
      this.cuadreCaja.funct_imprime_cuadre_de_caja_s(this.total_ventas_dia);                 
    },1000)
     
  } 

  funct_nex_model_exportar(){
    this.router.navigate(['/menu/exportar'])
  }

}
