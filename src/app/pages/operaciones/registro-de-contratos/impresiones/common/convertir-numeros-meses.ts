export function obtenerNombreMes(numeroMes: number): string {
  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Restar 1 al número del mes, ya que los meses en JavaScript van de 0 a 11
  const indiceMes = numeroMes - 1;

  // Verificar si el número de mes está dentro del rango válido
  if (indiceMes >= 0 && indiceMes < nombresMeses.length) {
    return nombresMeses[indiceMes];
  } else {
    // Devolver undefined si el número de mes está fuera del rango
    return '';
  }
}

export function obtenerFechaFomateada(value: string | null): string {
  if (value === null) return '';
  else {
    let partesFecha = value.substring(0, 10).split('/');
    let mes = partesFecha[0];
    let dia = partesFecha[1];
    let anio = partesFecha[2];
    return `${dia}/${mes}/${anio}`
  }
}

export function formatNumber(value: number | null) {
  if (value == null) return '00.00';
  else {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

