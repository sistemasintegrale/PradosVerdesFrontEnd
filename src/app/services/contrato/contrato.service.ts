import { map, pipe, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { ContratoFilters } from 'src/app/interfaces/contrato/contrato-filters';
import { environment } from 'src/environments/environments';
import { ContratoImpresion } from 'src/app/pages/operaciones/registro-de-contratos/impresiones/contrato-impresion.interface';
import { Cuota } from 'src/app/interfaces/cuota/Cuota';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private http = inject(HttpClient);
  constructor() { }

  ListarContratosPorFechas(filters: ContratoFilters) {
    return this.http.post<BaseResponse<Contrato[]>>(`${base_url}/Contrato`, filters).pipe(map(res => res.data));
  }

  ValidarSerie(serie: string) {
    return this.http.get<BaseResponse<boolean>>(`${base_url}/Contrato/ValidarSerie/${serie}`).pipe(map(res => res.data));
  }

  Guardar(contrato: Contrato, GuargarCuota: boolean) {
    contrato.cntc_vnumero_contrato = contrato.serie + contrato.cntc_vnumero_contrato;
    return this.http.post<BaseResponse<number>>(`${base_url}/Contrato/Guardar/${GuargarCuota}`, contrato).pipe(map(res => res));
  }

  Eliminar(id: number) {
    return this.http.get<BaseResponse<boolean>>(`${base_url}/Contrato/Eliminar/${id}`).pipe(map(res => res.data));
  }

  ContratoImpresion(cntc_icod_contrato: number) {
    return this.http.get<BaseResponse<ContratoImpresion>>(`${base_url}/Contrato/ContratoImpresion/${cntc_icod_contrato}`).pipe(map(res => res.data));
  }

  CuotasListar(cntc_icod_contrato: number) {
    return this.http.get<BaseResponse<Cuota[]>>(`${base_url}/Cuota/${cntc_icod_contrato}`).pipe(map(res => res.data));
  }
}
