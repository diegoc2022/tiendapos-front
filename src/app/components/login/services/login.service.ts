import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL?:string;
  private API?:string
  
  constructor(private http: HttpClient) {
    this.URL = Environment.endpoint;
    this.API = 'login';
  }

  funct_retorna_usuarios_s(data:any):Observable<any>{        
    return this.http.post<any>(`${this.URL}/${this.API}/user`,{
      "user":data.user,
      "clave":data.passw
    })
  }
}
