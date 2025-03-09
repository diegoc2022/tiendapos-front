
import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductosService {
    private URL?:string;
    private API?:string

    constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;
        this.API = 'productos';
    }

    funct_retorna_productos_s(){
        return this.http.get(`${this.URL}/${this.API}`);
    }

    funct_elimina_productos_s(){
       return this.http.delete(`${this.URL}/${this.API}`)
    }

    funct_inserta_productos_masivo_s(data:any[]){               
       return this.http.post(`${this.URL}/${this.API}`,data)
    }
}
