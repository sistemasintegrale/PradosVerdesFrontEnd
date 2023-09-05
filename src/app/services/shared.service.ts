import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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

}
