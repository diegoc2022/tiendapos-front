import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { EnvironmentProd } from '../../../../environments/environment2';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InventarioService {

    private URL?:string;
    private API?:string
    private URLPROD?:string;
    private APIPROD?:string;
 
    
    constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;       
        this.URLPROD = EnvironmentProd.endpoint;
        this.API = 'productos';
        this.APIPROD = 'inventario';       
    }    

    funct_edita_cantidad_s(cod:any,data:any){        
        const cant = parseInt(data.cantidad);      
        return this.http.patch(`${this.URL}/${this.API}/cantidad/${cod}`,{            
            "existencia":cant
        });
    }

    funct_actualiza_existencia_inventario_s(data:any[]):Observable<any[]>{                                    
        return this.http.post<any[]>(`${this.URLPROD}/${this.APIPROD}/editaVentaInv`,data);      
    }
}
