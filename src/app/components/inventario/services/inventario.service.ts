import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InventarioService {

    private URL?:string;
    private API?:string
    
    constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;
        this.API = 'productos';        
    }    

    funct_edita_cantidad_s(cod:any,data:any){        
        const cant = parseInt(data.cantidad);      
        return this.http.patch(`${this.URL}/${this.API}/cantidad/${cod}`,{            
            "existencia":cant
        });
    }
}
