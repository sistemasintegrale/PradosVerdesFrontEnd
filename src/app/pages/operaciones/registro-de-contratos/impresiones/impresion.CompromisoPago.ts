import { jsPDF } from 'jspdf';
import { ContratoImpresion } from './contrato-impresion.interface';
import { formatNumber, obtenerFechaFomateada, obtenerNombreMes } from './common/convertir-numeros-meses';
import { Cuota } from 'src/app/interfaces/cuota/Cuota';
import autoTable from 'jspdf-autotable';
export function ImprimirCompromisoPago(item: ContratoImpresion, cuotas: Cuota[]) {

  let initialX = 20;
  let initialY = 40;
  const doc = new jsPDF();
  doc.setFontSize(11);
  const skipLine = (val: number = 1) => {
    initialY += (5.5 * val);
  }
  const drawRectAndText = (value: string | null, x: number, size: number) => {
    if (value != null)
      doc.text(value, x + 2, initialY, { maxWidth: size });
    doc.roundedRect(x, initialY - 4, size, 5, 1, 1, 'S');
  }

  const drawTextAndLine = (text: string, x: number, value: string) => {
    doc.text(text, x, initialY);
    doc.setLineDashPattern([0.5, 0.5], 0);
    doc.line(x + 60, initialY, x + 150, initialY);
    if (value) {
      doc.text(value, x + 60, initialY - 1, { maxWidth: 110 })
      const fontSize = 11; // Modifica esto según el tamaño de fuente que estés utilizando
      let textWidth = doc.getStringUnitWidth(value) * fontSize / doc.internal.scaleFactor;
      if (textWidth > 110) {
        skipLine(1)
      }
    }


  }


  debugger
  doc.text(`Lima, ${item.fechaContrato!.substring(3, 5)} de ${obtenerNombreMes(parseInt(item.fechaContrato?.substring(0, 2)!))} del ${item.fechaContrato?.substring(6, 10)}`, initialX, initialY);
  doc.text(`Serie : ${item.numeroContrato?.substring(0, 4)}`, initialX + 100, initialY);
  doc.text(`Contrato : ${item.numeroContrato?.substring(4)}`, initialX + 130, initialY);

  skipLine(2);
  doc.text(' COMPROMISO DE PAGO - TITULARES PRIMERO Y SEGUNDO', initialX + 20, initialY);
  skipLine(2);

  doc.text('Yo, el suscrito(a) ', initialX, initialY);
  drawRectAndText(`${item.nombreContratante} ${item.apellidoPaternoContratante} ${item.apellidoMaternoContratante}`, initialX + 30, 100)
  doc.text(', identificado(a)', initialX + 140, initialY);

  skipLine();
  doc.text('con DNI :', initialX, initialY);
  drawRectAndText(item.numeroDocumentoContratante, initialX + 17, 20);
  doc.text(', domiciliado(a) en', initialX + 40, initialY);
  drawRectAndText(item.direccionContratante?.substring(0, 30)!, initialX + 72, 70);
  doc.text(' , con teléfono ', initialX + 142, initialY);
  skipLine();

  drawRectAndText(item.telefonoContratante, initialX, 30);
  doc.text(' y correo electrónico', initialX + 33, initialY);
  drawRectAndText(item.correoContrantante, initialX + 70, 70);
  doc.text(', en calidad de', initialX + 140, initialY);
  skipLine();

  doc.text('Primer   Titular,    he   adquirido   en   Camposanto    Parques    Del    Paraíso    una    sepultura ', initialX, initialY);
  skipLine();

  drawRectAndText(`${item.numeroSepultura}`, initialX, 50);
  doc.text('. El precio total es de', initialX + 50, initialY);
  drawRectAndText(`${formatNumber(item.precioTotal)}`, initialX + 90, 25);
  doc.text(',  con  un  pago  inicial  de', initialX + 120, initialY);
  skipLine();

  drawRectAndText(`${formatNumber(item.pagoInicial)}`, initialX, 50);
  doc.text(' y un saldo de', initialX + 50, initialY);
  drawRectAndText(`${formatNumber(item.saldo)}`, initialX + 75, 22);
  doc.text(', comprometiéndome a cancelar este', initialX + 100, initialY);
  skipLine();


  doc.text('último monto en', initialX, initialY);
  drawRectAndText(`${item.numeroCuotas}`, initialX + 30, 15);
  doc.text(' cuotas,  detalladas   en   el   siguiente   cronograma   de   pagos.', initialX + 45, initialY);
  skipLine();

  doc.text('En caso  de  que  el  Primer  Titular  no  asuma  la  responsabilidad de  los pagos, dejo constancia ', initialX, initialY);
  skipLine();


  doc.text('de los datos del Segundo Titular, cuyo nombre es', initialX, initialY);
  drawRectAndText(`${item.nombreContratante2} ${item.apellidoPaternoContratante2} ${item.apellidoMaternoContratante2}`, initialX + 85, 80);
  skipLine();

  doc.text('con DNI :', initialX, initialY);
  drawRectAndText(item.numeroDocumentoContratante2, initialX + 20, 20);
  doc.text('y teléfono', initialX + 42, initialY);
  drawRectAndText(item.telefonoContratante2, initialX + 60, 40);
  skipLine();

  let text = `El incumplimiento de las fechas programadas resultará en la transferencia de la propiedad de la sepultura al Camposanto Parques Del Paraíso, conforme a las normas establecidas en la cláusula quinta del contrato de compra y venta.Además, se aplicará una penalidad de S /. 50.00 SOLES por cuota / mes de retraso en los pagos establecidos en el contrato.`;
  doc.text(text, initialX, initialY, { maxWidth: 150 });
  skipLine(4);

  text = `El cliente debe enviar su comprobante al número 932 823 115, adjuntando el número de contrato en cada depósito o transferencia, solicitando su boleta electrónica hasta la cancelación total del espacio de sepultura.`;
  doc.text(text, initialX, initialY, { maxWidth: 150 });
  skipLine(3);

  doc.text('Datos para depósitos y transferencias:', initialX, initialY);
  skipLine(2);

  doc.text('Nombre: CORPORACION FUNERARIA DEL PARAISO SAC', initialX, initialY);
  skipLine();

  doc.text('BANCO DE CRÉDITO DEL PERÚ (BCP): 1949917788074', initialX, initialY);
  skipLine();

  doc.text('Cuenta Interbancaria (CCI): 00219400991778807499', initialX, initialY);
  skipLine(2);

  text = `Nota: La empresa no maneja cuentas individualizadas de clientes y no se hace responsable por vouchers ilegibles o extraviados.`
  doc.text(text, initialX, initialY, { maxWidth: 150 });
  skipLine(2);

  let currentX = initialX + 5;

  doc.setFillColor(255, 255, 0);
  doc.roundedRect(currentX - 5, initialY, 160, 15, 2, 2, 'FD');
  skipLine();

  text = 'ESTE COMPROMISO DE PAGO QUEDARÁ SIN EFECTO SI EL CLIENTE SOLICITA EL USO DEL ESPACIO ANTES DE LOS 60 DÍAS DE CARENCIA.';
  doc.text(text, currentX, initialY, { maxWidth: 150 })
  skipLine(10);




  doc.text(` FOMA S/.${formatNumber(item.foma)}(POR NIVEL-VARIABLE)`, initialX + 40, initialY);

  doc.addPage("a4");

  initialY = 40;

  skipLine(2);


  var tableData: (string | number | null)[][] = [];

  // Iterar sobre cada objeto en tu arreglo de cuotas
  cuotas.forEach(cuota => {
    // Crear una matriz para cada cuota con los valores que deseas mostrar en la tabla
    debugger
    let partesFecha = cuota.cntc_sfecha_cuota!.substring(0, 10).split('-');
    let anio = partesFecha[0];
    let mes = partesFecha[1];
    let dia = partesFecha[2];
    var dataPrint = `${dia}/${mes}/${anio}`
    var rowData = [
      cuota.cntc_inro_cuotas,
      cuota.cntc_nmonto_cuota!.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      dataPrint
    ];
    // Agregar la fila de datos a la matriz de datos de la tabla
    tableData.push(rowData);
  });





  autoTable(doc, {
    head: [['Cuota', 'Monto', 'Fecha a Pagar']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      textColor: [0, 0, 0],
      fillColor: [255, 255, 255],
    },
    bodyStyles: {
      lineColor: [0, 0, 0],
      minCellHeight: 5
    }
  })


  doc.setLineDashPattern([0, 0], 1);

  initialY = 260;

  doc.line(initialX + 5, initialY - 5, initialX + 60, initialY - 5);
  doc.text('FIRMA DEL TITULAR N°1', initialX + 10, initialY)
  doc.ellipse(initialX + 70, initialY - 20, 10, 20);


  doc.line(initialX + 90, initialY - 5, initialX + 150, initialY - 5);
  doc.text(' FIRMA DEL TITULAR N°2', initialX + 95, initialY)
  doc.ellipse(initialX + 160, initialY - 20, 10, 20);



  doc.save(`Compromiso de Pago Personal - ${item.numeroContrato}.pdf`);

}
