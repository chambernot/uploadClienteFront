import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { elementAt, Observable } from 'rxjs';
import { ClienteElement } from '../models/ClienteElement';



@Injectable()
export class ClienteService {
    clienturl='https://localhost:44394/api/cliente/';
  constructor(private http: HttpClient) { }

    getCliente(): Observable<ClienteElement[]>{
    return this.http.get<ClienteElement[]>(this.clienturl);
  }
    createCliente(cliente: ClienteElement ):Observable<any>{

      return this.http.post<any>(this.clienturl,cliente);
    }

    alterCliente(cliente: ClienteElement ):Observable<any>{

      return this.http.put<any>(this.clienturl,cliente);
    }

    delteCliente(id: string ):Observable<any>{

      return this.http.delete<any>(`${this.clienturl}?id=${id}`);
    }
    
    
}