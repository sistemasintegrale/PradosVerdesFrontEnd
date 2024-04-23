import { jsPDF } from 'jspdf';
import { ContratoImpresion } from './contrato-impresion.interface';
export function ImprimirPorcentajeDeUso(item: ContratoImpresion) {
  let initialX = 10;
  let initialY = 40;
  const doc = new jsPDF();
  doc.setFontSize(11);
  const skipLine = (val: number = 1) => {
    initialY += (6 * val);
  }
  const drawRectAndText = (value: string | null, x: number, size: number) => {
    if (value)
      doc.text(value, x + 2, initialY, { maxWidth: size });
    doc.roundedRect(x, initialY - 4, size, 5, 1, 1, 'S');
  }

  doc.text(`Lima,${item.fechaContrato!.substring(0, 2)} de Enero del 2024`, initialX, initialY);
  doc.text(`Serie : ${item.numeroContrato?.substring(0, 4)}`, initialX + 100, initialY);
  doc.text(`Contrato : ${item.numeroContrato?.substring(4)}`, initialX + 150, initialY);

  skipLine(3);
  doc.text('CONSTANCIA PARA APERTURA DE ESPACIO FAMILIAR (FINANCIADO)', initialX + 30, initialY);
  skipLine(4);

  doc.text('Yo, ', initialX, initialY);
  drawRectAndText(`${item.nombreContratante} ${item.apellidoPaternoContratante} ${item.apellidoMaternoContratante}`, initialX + 10, 140)
  doc.text(', contratante con', initialX + 150, initialY);

  skipLine();

  doc.text('DNI :', initialX, initialY);
  drawRectAndText(item.numeroDocumentoContratante, initialX + 10, 50);
  doc.text('y N° de contrato', initialX + 65, initialY);
  drawRectAndText(item.numeroContrato, initialX + 100, 30);
  doc.text(', CONTRATANTE/TITULAR', initialX + 130, initialY);

  skipLine();

  doc.text('del espacio de sepultura', initialX, initialY);
  drawRectAndText(item.numeroSepultura, initialX + 45, 90);
  doc.text(', con nivel de sepultura', initialX + 140, initialY);

  skipLine();

  doc.text('a utilizar', initialX, initialY);
  drawRectAndText(item.nivel, initialX + 15, 10);
  doc.text('.', initialX + 27, initialY);

  skipLine(2);

  doc.addImage('/assets/img/porcentajeUso.png', 'png', initialX, initialY, 180, 100);

  skipLine(27);


  doc.line(initialX + 60, initialY - 5, initialX + 130, initialY - 5);
  doc.text('FIRMA DEL CONTRATANTE/TITULAR', initialX + 60, initialY)
  doc.ellipse(initialX + 140, initialY - 20, 10, 20);
  doc.save(`Porcentaje de Uso ${item.numeroContrato}.pdf`);

}
