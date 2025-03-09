import { Injectable } from '@angular/core';
import { Environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SecuenciaService {
    private URL?:string;
    private API?:string;

    constructor(private http: HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'secuencia';
    }

    funct_retorna_id_secuencia(){              
        return this.http.get(`${this.URL}/${this.API}`);
    }

    funct_edita_id_secuencia(sec:any):Observable<any>{                             
        return this.http.patch<any>(`${this.URL}/${this.API}`,sec);      
    }
}
