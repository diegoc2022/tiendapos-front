import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';
import { format } from 'date-fns';

@Injectable({
    providedIn: 'root'
  })
export class VentasService {
    private URL?:string;
    private API?:string
    cantidad:number =0;
    total?:number;
    form_fecha:Date = new Date();
    subtotal:number =0;

   constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;
        this.API = 'ventas';
    }
   

    funct_tegistra_ventas_s(data:any,data2:any,accion:any,idCaja:any,fact:any):Observable<any>{ 
        this.cantidad = 1; 
        const prefijo = 'C1-';
        const user = localStorage.getItem('user');      
        this.total = this.cantidad * data.precio_venta;
        const fecha_actual = format(this.form_fecha,'yyyy-MM-dd'); 
        const hora_actual =  format(this.form_fecha,'HH:mm:ss');     
        return this.http.post<any>(`${this.URL}/${this.API}`,{           
            "id_venta":prefijo+0, 
            "id_caja":0,  
            "codProd":data.codProd,    
            "descripcion":data.descripcion,               
            "cantidad":this.cantidad,
            "existencia":data.existencia, 
            "precio_compra":data.precio_compra,  
            "precio_venta":this.total,  
            "origen_venta":data2,            
            "subtotal":this.total,
            "vendedor":user,
            "estado":accion,
            "factura": fact,
            "venta_por_und":data.venta_por_und,
            "fecha_registro":fecha_actual,
            "hora_registro": hora_actual      
        })        
    }

    funct_retorna_all_s(){
        return this.http.get(`${this.URL}/${this.API}`)
    }

    funct_edita_cantidad_s(data:any){ 
        let cant = parseInt(data.cantidad); 
        let total = cant * parseInt(data.subtotal);     
        return this.http.patch(`${this.URL}/${this.API}/cantidad/${data.id}`,{            
            "existencia":cant,
            "subtotal":total
        });
    }

    funct_elimina_item_ventas_s(data:any){        
        return this.http.delete(`${this.URL}/${this.API}/item/${data.id}`);
    }

    funct_elimina_id_ventas(data:any):Observable<any>{               
        return this.http.delete(`${this.URL}/${this.API}/vent/`,{body:data});
    }

    funct_close_ventas_s(data:any):Observable<any>{                                                        
        return this.http.put(`${this.URL}/${this.API}`,data);
    }

    funct_retorna_ventas_facturas(id:any){
        return this.http.get(`${this.URL}/${this.API}/factura/${id}`)
    }
}