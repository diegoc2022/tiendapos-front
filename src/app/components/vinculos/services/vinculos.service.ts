import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class VinculosService {
    private URL?:string;
    private API?:string

   constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;
        this.API = 'vinculos';        
    }
   

    funct_retorna_vinculos_s(data:any):Observable<any>{               
        return this.http.get<any>(`${this.URL}/${this.API}/${data}`);        
    }  

    funct_elimina_vinculos_s(){
      return  this.http.delete(`${this.URL}/${this.API}`)
    }

    funct_inserta_vinculos_masivos_s(data:any[]):Observable<any[]>{
      return this.http.post<any[]>(`${this.URL}/${this.API}`,data);
    }

    funct_registra_vinculos_s(data:any):Observable<any>{                      
      return this.http.post<any>(`${this.URL}/${this.API}/vinc/`,{                  
          "codigoInicial":data.codigoInic.toUpperCase(),   
          "codigoVinculo":data.codigoVinc.toUpperCase()            
      })        
    }

}