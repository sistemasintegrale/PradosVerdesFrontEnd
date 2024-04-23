import { jsPDF } from 'jspdf';
import { ContratoImpresion } from './contrato-impresion.interface';
import { obtenerFechaFomateada, obtenerNombreMes } from './common/convertir-numeros-meses';
export function ImprimirAdendaDeUso(item: ContratoImpresion) {
  let initialX = 20;
  let initialY = 40;
  const doc = new jsPDF();
  doc.setFontSize(12);
  const skipLine = (val: number = 1) => {
    initialY += (6 * val);
  }
  const drawRectAndText = (value: string | null, x: number, size: number) => {
    if (value)
      doc.text(value, x + 2, initialY, { maxWidth: size });
    doc.roundedRect(x, initialY - 4, size, 5, 1, 1, 'S');
  }

  const drawTextAndLine = (text: string, x: number, value: string) => {
    doc.text(text, x, initialY);
    doc.setLineDashPattern([0.5, 0.5], 0);
    doc.line(x + 40, initialY, x + 150, initialY);
    if (value) {
      doc.text(value, x + 40, initialY - 1, { maxWidth: 110 })
      const fontSize = 12; // Modifica esto según el tamaño de fuente que estés utilizando
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
  doc.text('ADENDA DESIGNACIÓN Y/O TITULAR ALTERNO', initialX + 30, initialY);
  skipLine(3);

  doc.text('Con la presente adenda al contrato N° ', initialX, initialY);
  drawRectAndText(item.numeroContrato, initialX + 75, 30);
  doc.text(', se establece que cualquier decisión', initialX + 107, initialY);

  skipLine();

  doc.text('tomada en relación con el contrato en cuestión deberá ser alcanzada mediante mutuo', initialX, initialY);

  skipLine();

  doc.text('acuerdo entre las partes que figuran y firman en este documento.', initialX, initialY);

  skipLine(2);

  doc.text('Además, se especifica que el segundo titular tiene la facultad de solicitar el uso del espacio', initialX, initialY);
  skipLine();
  doc.text('y asumir responsabilidades financieras asociadas, pero no puede realizar modificaciones en', initialX, initialY);
  skipLine();
  doc.text('ningún documento del contrato sin la autorización legal expresa del primer titular.', initialX, initialY);
  skipLine(3)
  doc.setFont("Helvetica", "Bold");
  doc.text('Titular N°1', initialX + 20, initialY)
  skipLine(1);
  drawTextAndLine('Nombre y apellido:', initialX + 20, item.nombreContratante + ' ' + item.apellidoPaternoContratante + ' ' + item.apellidoMaternoContratante);
  skipLine(1);
  drawTextAndLine('DNI:', initialX + 20, item.numeroDocumentoContratante!);
  skipLine(1);
  drawTextAndLine('Domicilio:', initialX + 20, item.direccionContratante!);
  skipLine(1);
  drawTextAndLine('Estado Civil:', initialX + 20, item.estadoCivilContratante!);
  skipLine(1);
  drawTextAndLine('Fecha Nacimiento:', initialX + 20, obtenerFechaFomateada(item.fechaNacimientoContratante));
  skipLine(1);
  drawTextAndLine('Teléfono:', initialX + 20, item.telefonoContratante!);
  skipLine(2);

  doc.text('Titular N°2', initialX + 20, initialY)
  skipLine(1);
  drawTextAndLine('Nombre y apellido:', initialX + 20, item.nombreContratante2 + ' ' + item.apellidoPaternoContratante2 + ' ' + item.apellidoMaternoContratante2);
  skipLine(1);
  drawTextAndLine('DNI:', initialX + 20, item.numeroDocumentoContratante2!);
  skipLine(1);
  drawTextAndLine('Domicilio:', initialX + 20, item.direccionContratante2!);
  skipLine(1);
  drawTextAndLine('Estado Civil:', initialX + 20, item.estadoCivilContratante2!);
  skipLine(1);
  drawTextAndLine('Fecha Nacimiento:', initialX + 20, item.fechaNacimientoContratante2!);
  skipLine(1);
  drawTextAndLine('Teléfono:', initialX + 20, item.telefonoContratante2!);

  skipLine(2)
  doc.text('Firman ambos titulares en señal de conformidad.', initialX, initialY)
  skipLine(7)
  doc.setFont("Helvetica", "Normal");

  doc.setLineDashPattern([0, 0], 1);

  doc.line(initialX + 10, initialY - 5, initialX + 60, initialY - 5);
  doc.text('FIRMA DEL TITULAR N°1', initialX + 10, initialY)
  doc.ellipse(initialX + 70, initialY - 20, 10, 20);


  doc.line(initialX + 100, initialY - 5, initialX + 150, initialY - 5);
  doc.text(' FIRMA DEL TITULAR N°2', initialX + 95, initialY)
  doc.ellipse(initialX + 160, initialY - 20, 10, 20);

  doc.save(`ADENDA ${item.numeroContrato}.pdf`);
}
