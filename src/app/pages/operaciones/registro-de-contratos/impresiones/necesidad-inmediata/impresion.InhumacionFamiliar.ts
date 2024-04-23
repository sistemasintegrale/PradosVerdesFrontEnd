import { jsPDF } from 'jspdf';
import { ContratoImpresion } from '../contrato-impresion.interface';
import { obtenerFechaFomateada, obtenerNombreMes } from '../common/convertir-numeros-meses';
export function ImprimirInhumacionFamiliar(item: ContratoImpresion) {

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



  doc.text(`Lima, ${item.fechaContrato!.substring(3, 5)} de ${obtenerNombreMes(parseInt(item.fechaContrato?.substring(0, 2)!))} del ${item.fechaContrato?.substring(6, 10)}`, initialX, initialY);
  doc.text(`Serie : ${item.numeroContrato?.substring(0, 4)}`, initialX + 100, initialY);
  doc.text(`Contrato : ${item.numeroContrato?.substring(4)}`, initialX + 130, initialY);

  skipLine(2);
  doc.text(' AUTORIZACIÓN DE INHUMACIÓN ESPACIO FAMILIAR', initialX + 40, initialY);
  skipLine(2);

  doc.text('Yo, ', initialX, initialY);
  drawRectAndText(`${item.nombreContratante} ${item.apellidoPaternoContratante} ${item.apellidoMaternoContratante}`, initialX + 10, 130)
  doc.text(', contratante  con', initialX + 140, initialY);

  skipLine();
  doc.text('DNI :', initialX, initialY);
  drawRectAndText(item.numeroDocumentoContratante, initialX + 10, 40);
  doc.text('y N° de contrato', initialX + 55, initialY);
  drawRectAndText(item.numeroContrato, initialX + 90, 30);
  doc.text(', otorgo   mi   autorización', initialX + 125, initialY);
  skipLine();

  doc.text('a         Inversiones       y       Desarrollo      Prados       Verdes      SAC     para       la      inhumación', initialX, initialY);
  skipLine();

  doc.text('de', initialX, initialY);
  drawRectAndText(`${item.nombreFallecido} ${item.apellidoPaternoFallecido} ${item.apellidoMaternoFallecido}`, initialX + 7, 130);
  doc.text(' en   la  sepultura', initialX + 140, initialY);
  skipLine();

  drawRectAndText(`${item.numeroSepultura}`, initialX, 80);
  doc.text(', ubicada  en  el Camposanto Parques del  Paraíso,', initialX + 80, initialY);
  skipLine();

  doc.text('Plataforma', initialX, initialY);
  drawRectAndText(`${item.plataforma}`, initialX + 20, 10);
  doc.text(', manzana', initialX + 30, initialY);

  drawRectAndText(`${item.manzana}`, initialX + 50, 60);

  doc.text(',  sepultura', initialX + 110, initialY);
  drawRectAndText(`${item.numeroSepultura}`, initialX + 130, 20);
  doc.text(', nivel', initialX + 150, initialY);
  drawRectAndText(`${item.nivel}`, initialX + 160, 10);
  doc.text('.', initialX + 170, initialY);

  skipLine(1.5);

  doc.text('Mi   relación   con  el  difunto  es', initialX, initialY);
  drawRectAndText(`${item.parentescoContratatante}`, initialX + 60, 40);
  doc.text(',  y     declaro     estar     facultado', initialX + 110, initialY);
  skipLine();
  doc.text('para   esta   autorización,  asumiendo   responsabilidad   ante   Inversiones   y  Desarrollo   Prados', initialX, initialY);
  skipLine();
  doc.text('Verdes   SAC   y terceros.  Bajo  juramento,   afirmo   entender   y   aceptar   las   normas   legales, ', initialX, initialY);
  skipLine();
  doc.text('procedimientos,   y  regulaciones  del   Camposanto,   así   como   mis   derechos   y   obligaciones.', initialX, initialY);

  skipLine(1.5);
  doc.setFont('Helvetica', "Bold");
  doc.text('Condiciones Específicas:', initialX, initialY);
  doc.setFont('Helvetica', "Normal");
  skipLine(1.5);

  let currentX = initialX;
  currentX += 20;
  doc.text("La primera apertura no tiene costo asociado.", currentX, initialY, { maxWidth: 150 })
  skipLine();
  doc.text("La excavación alcanza una profundidad de 1 metro.", currentX, initialY, { maxWidth: 150 })
  skipLine();
  doc.text("Al concluir la ceremonia, se instalará una lápida provisional.", currentX, initialY, { maxWidth: 150 })
  skipLine();
  doc.text("La lápida de mármol se colocará en un plazo aproximado de 30 a 45 días hábiles.", currentX, initialY, { maxWidth: 150 })
  skipLine();
  doc.text("A partir del segundo uso del espacio, se aplicará un pago por derecho de apertura y cierre, con un monto variable.", currentX, initialY, { maxWidth: 150 })
  skipLine(1.5);
  doc.text("El pago del FOMA (Fondo de Mantenimiento) se realizará de acuerdo con la lista de precios al momento de la apertura del espacio, siendo un monto variable por cada nivel.", currentX, initialY, { maxWidth: 150 })
  skipLine(2.5);

  currentX = initialX + 5;

  doc.setFillColor(255, 255, 0);
  doc.roundedRect(currentX - 5, initialY - 5, 160, 28, 2, 2, 'FD');
  doc.text("Nota Importante:", currentX, initialY, { maxWidth: 150 })

  skipLine();

  doc.text("CUALQUIER TRÁMITE ADMINISTRATIVO QUE SE ADJUNTE AL CONTRATO O LO SOLICITE EL CLIENTE, TENDRÁ UN COSTO ADICIONAL(EJEM: ADENDA, CONSTANCIA DE SEPULTURA, CAMBIO DE PLAN DE SEPULTURA, CONSTANCIA POR CAMBIO DE TITULAR, ETC).", currentX, initialY, { maxWidth: 150 })
  skipLine(4);
  currentX = 50 + initialX;
  doc.text("AUTORIZACIÓN DE CONFECCIÓN DE LÁPIDA", currentX, initialY);
  skipLine(2);
  currentX = 40;
  drawTextAndLine('NOMBRES :', currentX, item.nombreFallecido!);
  skipLine(1);
  drawTextAndLine('APELLIDOS :', currentX, item.apellidoPaternoFallecido! + ' ' + item.apellidoMaternoFallecido!);
  skipLine(1);
  drawTextAndLine('FECHA DE NACIMIENTO :', currentX, obtenerFechaFomateada(item.fechaNacimientoFallecido));
  skipLine(1);
  drawTextAndLine('FECHA DE FALLECIMIENTO :', currentX, obtenerFechaFomateada(item.fechaFallecimientoFallecido));
  skipLine(1);
  drawTextAndLine('TIPO DE CONTRATO :', currentX, item.tipoContrato!);
  skipLine(1);
  drawTextAndLine('TIPO DE ESPACIO :', currentX, item.tipoSepultura!);

  skipLine(8)
  doc.setFont(doc.getFont().fontName, "Normal");



  doc.line(initialX + 50, initialY - 5, initialX + 120, initialY - 5);
  doc.text('FIRMA DEL CONTRATANTE/TITULAR', initialX + 50, initialY)
  doc.ellipse(initialX + 130, initialY - 20, 10, 20);
  doc.save(`Inhumación Personal - ${item.numeroContrato}.pdf`);

}
