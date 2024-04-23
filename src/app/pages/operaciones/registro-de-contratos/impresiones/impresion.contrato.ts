import { jsPDF } from 'jspdf';
import { ContratoImpresion } from './contrato-impresion.interface';
import { obtenerNombreMes } from './common/convertir-numeros-meses';

type dataType = 'numeric' | 'date' | 'text' | 'integer';

export function ImprimirContrato(item: ContratoImpresion) {
  const doc = new jsPDF();
  const initialX = 10;
  const initialY = 5;
  const drawLine = (x: number, y: number, width: number) => {
    doc.setLineDashPattern([0.5, 0.5], 0);
    doc.line(x, y, x + width, y);
  };

  const drawRectWithCheckbox = (x: number, y: number) => {
    const checkboxSize = 4;
    doc.setLineDashPattern([], 0);
    doc.rect(x, y, checkboxSize, checkboxSize, 'S');
  };
  const drawTextAndLine = (text: string, x: number, y: number, value: any | null, width: number = 40, type: dataType) => {
    doc.setFont("Arial", "bold");
    doc.text(text, x, y);


    doc.setFont("Arial Narrow", "Normal");
    doc.setTextColor(67, 125, 83);
    let dataPrint: string = '';
    if (type === 'text') {
      if (value == null) dataPrint = '';
      else dataPrint = value;
    }

    if (type == 'numeric') {
      if (value === null || value === undefined) dataPrint = '00.00';
      else {
        dataPrint = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }

    if (type == 'date') {
      if (value === null) dataPrint = '';
      else {
        let partesFecha = value.substring(0, 10).split('/');
        let mes = partesFecha[0];
        let dia = partesFecha[1];
        let anio = partesFecha[2];
        dataPrint = `${dia}/${mes}/${anio}`
      }
    }

    if (type == 'integer') {
      if (value === null) dataPrint = '';
      else dataPrint = value.toString()
    }

    doc.text(dataPrint, x, y + 4, { maxWidth: width })
    doc.setTextColor(0, 0, 0);


    drawLine(x, y + 5, width);
  };

  doc.setFont("Arial", "bold");
  doc.setFontSize(11.25);
  doc.setTextColor(67, 125, 83);
  doc.text("CONTRATO DE COMPRA - VENTA DE PLAN DE SEPULTURA", initialX + 40, initialY + 10);
  doc.setFontSize(8.25);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Arial Narrow", "Normal");
  doc.text("SERIE :", initialX + 150, initialY + 17);
  doc.text(item.numeroContrato!, 171, initialY + 17);

  let text = 'Conste por el presente documento privado el contrato de compra - venta que celebran, INVERSIONES Y DESARROLLO PRADOS VERDES S.A.C. En adelante “LA PROMOTORA”, Inscrito en Partida Electrónica N” 11234409 del Registro Mercantil de Lima, RUC 20500662159, con domicilio en Av. Las Palmas N° 2020 esq. Quebrada Verde distrito de Pachacamac, debidamente representada por su apoderado especial y de la otra parte a quien se le denomina "EL TITULAR".';
  doc.text(text, initialX, initialY + 25, { maxWidth: 190, align: "justify" });
  doc.setFont("Arial", "bold");
  doc.text("NOMBRE IEC - CONVENIO:", initialX, initialY + 40);

  drawLine(initialX + 40, initialY + 40, 50);
  doc.text("ORIGEN DE VENTA:", initialX + 100, initialY + 40);

  drawLine(initialX + 130, initialY + 40, 60);
  doc.setTextColor(67, 125, 83);
  doc.text(item.strNombreIEC!, initialX + 40, initialY + 39); //todo: Falta
  doc.text(item.origenVenta!, initialX + 130, initialY + 39);//todo: Falta
  doc.setTextColor(0, 0, 0);

  doc.text("DATOS DEL TITULAR CONTRATANTE", initialX, initialY + 45);
  doc.text("UNIDAD DE VENTA:", initialX + 100, initialY + 45);
  doc.text("ICO", initialX + 130, initialY + 45);
  drawRectWithCheckbox(initialX + 137, initialY + 42);
  doc.text("MAS", initialX + 145, initialY + 45);
  drawRectWithCheckbox(initialX + 152, initialY + 42);
  doc.text("MIN", initialX + 160, initialY + 45);
  drawRectWithCheckbox(initialX + 167, initialY + 42);
  drawTextAndLine("Nombres", initialX, initialY + 50, item.nombreContratante, 40, 'text');
  drawTextAndLine("Apellido Paterno", initialX + 75, initialY + 50, item.apellidoPaternoContratante, 40, 'text');
  drawTextAndLine("Apellido Materno", initialX + 150, initialY + 50, item.apellidoMaternoContratante, 40, 'text');

  drawTextAndLine("Doc. Identidad: Tipo / N° R.U.C.", initialX, initialY + 60, item.numeroDocumentoContratante, 40, 'text');
  drawTextAndLine("Fecha de Nacimiento", initialX + 50, initialY + 60, item.fechaNacimientoContratante, 40, 'date');
  drawTextAndLine("Estado Civil", initialX + 100, initialY + 60, item.estadoCivilContratante, 40, 'text');
  drawTextAndLine("Parentesco", initialX + 150, initialY + 60, item.parentescoContratatante, 40, 'text');

  drawTextAndLine("Nacionalidad", initialX, initialY + 70, item.nacionalidadContratante, 30, 'text');
  drawTextAndLine("Teléfono", initialX + 35, initialY + 70, item.telefonoContratante, 30, 'text');
  drawTextAndLine("Domicilio: Urb./Etapa/Sector", initialX + 70, initialY + 70, item.direccionContratante, 120, 'text');

  doc.setFont("Arial", "bold");
  doc.text("DATOS DEL SEGUNDO TITULAR", initialX, initialY + 80);
  drawTextAndLine("Nombres", initialX, initialY + 85, item.nombreContratante2, 40, 'text');
  drawTextAndLine("Apellido Paterno", initialX + 75, initialY + 85, item.apellidoPaternoContratante2, 40, 'text');
  drawTextAndLine("Apellido Materno", initialX + 150, initialY + 85, item.apellidoMaternoContratante2, 40, 'text');

  drawTextAndLine("Doc. Identidad: Tipo / N° R.U.C.", initialX, initialY + 95, item.numeroDocumentoContratante2, 40, 'text');
  drawTextAndLine("Fecha de Nacimiento", initialX + 50, initialY + 95, item.fechaNacimientoContratante2, 40, 'date');
  drawTextAndLine("Estado Civil", initialX + 100, initialY + 95, item.estadoCivilContratante2, 40, 'text');
  drawTextAndLine("Parentesco", initialX + 150, initialY + 95, item.parentescoContratatante2, 40, 'text');

  drawTextAndLine("Nacionalidad", initialX, initialY + 105, item.nacionalidadContratante2, 30, 'text');
  drawTextAndLine("Teléfono", initialX + 35, initialY + 105, item.telefonoContratante2, 30, 'text');
  drawTextAndLine("Domicilio: Urb./Etapa/Sector", initialX + 70, initialY + 105, item.direccionContratante2, 120, 'text');

  doc.setFont("Arial", "bold");
  doc.text("BENEFICIARIO", initialX, initialY + 115);

  drawTextAndLine("Nombres", initialX, initialY + 120, item.nombreBeneficiario, 40, 'text');
  drawTextAndLine("Apellido Paterno", initialX + 75, initialY + 120, item.apellidoPaternoBeneficiario, 40, 'text');
  drawTextAndLine("Apellido Materno", initialX + 150, initialY + 120, item.apellidoMaternoBeneficiario, 40, 'text');

  drawTextAndLine("Doc. Identidad: Tipo / N° R.U.C.", initialX, initialY + 130, item.documentoBeneficiario, 40, 'text');
  drawTextAndLine("Fecha de Nacimiento", initialX + 45, initialY + 130, item.fechaNacimientoBeneficiario, 40, 'date');
  drawTextAndLine("Dirección", initialX + 90, initialY + 130, item.direccionBeneficiario, 100, 'text');

  doc.setFont("Arial", "bold");
  doc.text("DATOS DEL FALLECIDO", initialX, initialY + 140);

  drawTextAndLine("Nombres", initialX, initialY + 145, item.nombreFallecido, 50, 'text');
  drawTextAndLine("Apellido Paterno", initialX + 65, initialY + 145, item.apellidoPaternoFallecido, 50, 'text');
  drawTextAndLine("Apellido Materno", initialX + 130, initialY + 145, item.apellidoMaternoFallecido, 50, 'text');

  drawTextAndLine("Doc. Identidad: Tipo / N°", initialX, initialY + 155, item.documentoFallecido, 30, 'text');
  drawTextAndLine("Fecha de Nacimiento", initialX + 40, initialY + 155, item.fechaNacimientoFallecido, 30, 'date');
  drawTextAndLine("Fecha de Fallecimiento", initialX + 80, initialY + 155, item.fechaFallecimientoFallecido, 30, 'date');
  drawTextAndLine("Fecha de entierro", initialX + 120, initialY + 155, item.fechaEntierroFallecido, 30, 'date');
  drawTextAndLine("Nacionalidad", initialX + 160, initialY + 155, item.nacionalidadFallecido, 30, 'text');

  doc.setFont("Arial", "bold");
  doc.text(" SECCIÓN I CONDICIONES GENERALES", initialX + 80, initialY + 166);

  doc.setFont("Arial", "bold");
  doc.text("I.A. TIPO DE PLAN", initialX, initialY + 170);
  drawTextAndLine("Código Plan", initialX, initialY + 175, item.codigoPlan, 80, 'text');
  drawTextAndLine("Nombre Plan", initialX + 100, initialY + 175, item.nombrePlan, 80, 'text');

  doc.setFont("Arial", "bold");
  doc.text("I.A. DE LA SEPULTURA", initialX, initialY + 185);

  drawTextAndLine("Tipo de sepultura", initialX, initialY + 190, item.tipoSepultura, 65, 'text');
  drawTextAndLine("Capac. Contrat.", initialX + 70, initialY + 190, item.capacidadContratada, 20, 'text');
  drawTextAndLine("Capac. Total", initialX + 95, initialY + 190, item.capacidadTotal, 20, 'text');
  drawTextAndLine("Urnas", initialX + 120, initialY + 190, item.urnas, 15, 'text');
  drawTextAndLine("Serv. de inhumación", initialX + 140, initialY + 190, item.servicioInhumacion, 25, 'text');
  drawTextAndLine("Plataforma", initialX + 170, initialY + 190, item.plataforma, 20, 'text');

  drawTextAndLine("Manzana", initialX, initialY + 200, item.manzana, 25, 'text');
  drawTextAndLine("N° de Sepultura", initialX + 40, initialY + 200, item.numeroSepultura, 25, 'text');
  drawTextAndLine("Nivel", initialX + 70, initialY + 200, item.nivel, 25, 'text');
  drawTextAndLine("Código de Sepultura", initialX + 105, initialY + 200, item.codigoSepultura, 45, 'text');
  drawTextAndLine("N° de Reserva", initialX + 155, initialY + 200, item.numeroReserva, 35, 'text');

  doc.setFont("Arial", "bold");
  doc.text("I.C DE LA RETRIBUCIÓN", initialX, initialY + 210);

  drawTextAndLine("Precio Lista", initialX, initialY + 215, item.precioLista, 30, 'numeric');
  drawTextAndLine("Descuento", initialX + 40, initialY + 215, item.descuento, 30, 'numeric');
  drawTextAndLine("Inhumación", initialX + 80, initialY + 215, item.inhumacion, 30, 'numeric');
  drawTextAndLine("FOMA", initialX + 120, initialY + 215, item.foma, 30, 'numeric');
  drawTextAndLine("Precio Total", initialX + 160, initialY + 215, item.precioTotal, 30, 'numeric');

  doc.setFont("Arial", "bold");
  doc.text("I.D DEL FINANCIAMIENTO", initialX, initialY + 225);

  doc.text("Con.", initialX, initialY + 230);
  drawRectWithCheckbox(initialX, initialY + 231);
  doc.text("FPV", initialX + 15, initialY + 230);
  drawRectWithCheckbox(initialX + 15, initialY + 231);
  doc.text("FBA", initialX + 30, initialY + 230)
  drawRectWithCheckbox(initialX + 30, initialY + 231);

  drawTextAndLine("Cód. Consulta Créd.", initialX + 45, initialY + 230, '', 25, 'text');//TODO:falta
  drawTextAndLine("Pago Inicial", initialX + 75, initialY + 230, item.pagoInicial, 20, 'numeric');
  drawTextAndLine("N° Recibo", initialX + 100, initialY + 230, '', 20, 'text');//TODO:falta
  drawTextAndLine("Saldo", initialX + 125, initialY + 230, item.saldo, 20, 'numeric');//TODO:falta
  drawTextAndLine("Tasa Financ.", initialX + 150, initialY + 230, '', 20, 'text');//TODO:falta
  drawTextAndLine("N°Cuotas", initialX + 175, initialY + 230, item.numeroCuotas, 15, 'integer');

  drawTextAndLine("Periodicidad de Pago", initialX, initialY + 240, item.sistemaPago == 'CREDITO' ? 'MENSUAL' : '', 25, 'text');//TODO:falta
  drawTextAndLine("Valor cuota", initialX + 30, initialY + 240, item.montoCuota, 20, 'numeric');
  drawTextAndLine("Primer Vencimiento", initialX + 55, initialY + 240, item.fechaCuota, 25, 'date');
  drawTextAndLine("Ultimo Vencimiento", initialX + 85, initialY + 240, item.ultimoVencimiento, 25, 'date');//TODO:falta
  drawTextAndLine("Documento Financ.", initialX + 115, initialY + 240, item.documentoFinanciado, 25, 'text');
  drawTextAndLine("Comprobante", initialX + 145, initialY + 240, item.comprobante, 20, 'text');//TODO:falta
  drawTextAndLine("Sistema de Pago", initialX + 170, initialY + 240, item.sistemaPago, 20, 'text');//TODO:falta

  doc.setFont("Arial Narrow", "Normal");
  text = 'como generales (detalladas al inverso), prevista en el presente contrato, como en las cláusulas adicionales emitidas según el plan de venta adquirido por el TITULAR.';

  doc.text('Firmado por duplicado, el ', initialX, initialY + 250);
  drawTextAndLine("", initialX + 33, initialY + 246, item.fechaContrato?.substring(3, 5), 10, 'text')
  doc.text('de', initialX + 45, initialY + 250);
  drawTextAndLine("", initialX + 50, initialY + 246, obtenerNombreMes(parseInt(item.fechaContrato?.substring(0, 2)!)), 12, 'text')
  doc.text('de', initialX + 65, initialY + 250);
  drawTextAndLine("", initialX + 70, initialY + 246, item.fechaContrato?.substring(6, 10), 12, 'text')
  doc.text('Declaro conocer y estar conforme con toda y cada una de las condiciones tanto particulares', initialX + 85, initialY + 250);

  doc.text(text, initialX, initialY + 253, { maxWidth: 190, align: "justify" });

  doc.setLineDashPattern([], 0);
  doc.setLineWidth(1);
  doc.setDrawColor(67, 125, 83);
  doc.rect(initialX, initialY + 260, 60, 20, 'S');
  doc.setFont("Arial", "bold");
  doc.text('FIRMA CONTRATANTE', initialX + 15, initialY + 285)

  doc.rect(initialX + 65, initialY + 260, 60, 20, 'S');
  doc.text('FIRMA P.P. LA PROMOTORA', initialX + 75, initialY + 285)

  doc.rect(initialX + 130, initialY + 260, 60, 20, 'S');
  doc.text('FIRMA GERENTE GENERAL', initialX + 140, initialY + 285)

  doc.save(`${item.numeroContrato}.pdf`);

}
