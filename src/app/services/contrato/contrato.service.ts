import { map, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { ContratoFilters } from 'src/app/interfaces/contrato/contrato-filters';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
 
  private http = inject(HttpClient);
  constructor() { }

  ListarContratosPorFechas(filters : ContratoFilters){
    return this.http.post<BaseResponse<Contrato[]>>(`${base_url}/Contrato`,filters).pipe(map(res => res.data));
  }
}
