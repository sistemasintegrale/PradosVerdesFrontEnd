import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { TablaVentasDetalle } from 'src/app/interfaces/tabla-ventas/tabla-ventas-detalle';
import { TablaRegistro } from 'src/app/interfaces/tabla/tabla-registro';
import { Vendedor } from 'src/app/interfaces/vendedor/vendedor';
import { environment } from 'src/environments/environments';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private http = inject(HttpClient); 

  tablaVentasDetalle(icod : number) : Observable<TablaVentasDetalle[]>{
    return this.http.get<BaseResponse<TablaVentasDetalle[]>>(`${base_url}/General/TablaVentasdetalle/${icod}`).pipe(map(res =>res.data));
  }

  tablaRegistro(icod : number): Observable<TablaRegistro[]>{
    return this.http.get<BaseResponse<TablaRegistro[]>>(`${base_url}/General/TablaRegistro/${icod}`).pipe(map(res =>res.data));
  }

  vendedores(): Observable<Vendedor[]>{
    return this.http.get<BaseResponse<Vendedor[]>>(`${base_url}/General/Vendedores`).pipe(map(res =>res.data));
  }
}
