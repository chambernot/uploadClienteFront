import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { elementAt, Observable } from 'rxjs';
import { CepElement } from '../models/CepElement';



@Injectable()
export class CepService {
    resultado!:CepElement;

    cepurl='https://viacep.com.br/ws/';
  constructor(private http: HttpClient) { }

    getCep(cep:string){
    return this.http.get<CepElement>(`${this.cepurl}${cep}/json/`);
    
  }
    
 
   
}