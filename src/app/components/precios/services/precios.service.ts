import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';

@Injectable()
export class PreciosService {
    private URL?:string;
    private API?:string
    
    constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;
        this.API = 'productos';        
    }

    funct_edita_precios_s(cod:any,data:any){       
        return this.http.patch(`${this.URL}/${this.API}/productos/${cod}`,{            
            "precio_venta":data.precio
        });
    }
}
