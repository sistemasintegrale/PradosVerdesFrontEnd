import { jsPDF } from 'jspdf';
import { ContratoImpresion } from '../contrato-impresion.interface';
import { obtenerFechaFomateada, obtenerNombreMes } from '../common/convertir-numeros-meses';
export function ImprimirProgramacionEntierro(item: ContratoImpresion) {

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
    if (value && value != null && value != '') {
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
  doc.text('PROGRAMACIÓN DE ENTIERRO', initialX + 50, initialY);
  skipLine(2);

  doc.text(' Parques del Paraíso, les hace llegar nuestras más sentidas condolencias a la familia de quien', initialX, initialY);
  skipLine();
  doc.text('en vida fue:  ', initialX, initialY);
  drawRectAndText(`${item.nombreFallecido} ${item.apellidoPaternoFallecido} ${item.apellidoMaternoFallecido}`, initialX + 25, 120)
  doc.text(' y a la vez ', initialX + 145, initialY);

  skipLine();
  doc.text('se programa el servicio para:', initialX, initialY);
  skipLine(2);



  let currentX = initialX + 5;

  currentX = 50 + initialX;
  currentX = 40;
  drawTextAndLine('FECHA DE INHUMACIÓN :', currentX, obtenerFechaFomateada(item.fechaEntierroFallecido));
  skipLine(1);
  drawTextAndLine('HORARIO PROGRAMADO :', currentX, obtenerFechaFomateada(item.fechaEntierroFallecido));
  skipLine(1);
  drawTextAndLine('TIPO DE ESPACIO :', currentX, item.tipoSepultura!);
  skipLine(1);
  drawTextAndLine('RELIGIÓN :', currentX, item.religionFallecido!);
  skipLine(1);
  drawTextAndLine('TIPO DE DECESO :', currentX, item.tipoDeceso!);


  skipLine(2)
  currentX = initialX + 5;
  doc.setFillColor(255, 255, 0);
  doc.roundedRect(currentX - 5, initialY - 5, 160, 28, 2, 2, 'FD');
  doc.text("NOTA:", currentX, initialY, { maxWidth: 150 })

  skipLine();

  doc.text("En caso falte regularizar documentos, firmas del contrato, cancelación del espacio de sepultura, entre otros; la persona titular debe de acercarse 30 minutos antes de su horario programado.", currentX, initialY, { maxWidth: 150 })
  skipLine(12);



  doc.line(initialX + 50, initialY - 5, initialX + 120, initialY - 5);
  doc.text('FIRMA DEL CONTRATANTE/TITULAR', initialX + 50, initialY)
  doc.ellipse(initialX + 130, initialY - 20, 10, 20);

  doc.save(`Programación Entierro - ${item.numeroContrato}.pdf`);

}
