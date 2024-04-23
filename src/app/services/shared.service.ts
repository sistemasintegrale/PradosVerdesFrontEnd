import { UsuarioApiResponse } from './../models/api-models/UsuarioAPI.response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { format } from 'date-fns';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _http = inject(HttpClient)

  obtenerPrimeraFechaDelAño(): string {
    const year = new Date().getFullYear();
    const firstDay = new Date(year, 0, 1);
    const formattedDate = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-${firstDay.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }

  convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('-');
    if (parts.length !== 3)
      return inputDate;
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  obtenerFechaActual(): string {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 al mes porque los meses en JavaScript van de 0 a 11
    const dia = fecha.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
  }

  DateToInput(fecha: string): string {
    if (fecha == null) return '';
    const parsedDate = new Date(fecha);
    return format(parsedDate, 'yyyy-MM-dd');
  }

  ObtenerDatosDni(dni: string): Observable<UsuarioApiResponse> {
    return this._http.get<UsuarioApiResponse>(`${base_url}/ApiProviders/${dni}`);
  }


  ObtenerNombreMes(mes: number) {
    const meses: string[] = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    // Restamos 1 al número del mes ya que los índices de los arrays comienzan en 0
    return meses[mes - 1];
  }

}
