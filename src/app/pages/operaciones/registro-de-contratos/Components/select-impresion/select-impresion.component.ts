import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { ImprimirContrato } from '../../impresiones/impresion.contrato';
import { ImprimirPorcentajeDeUso } from '../../impresiones/impresion.porcentaje-uso';
import { ContratoImpresion } from '../../impresiones/contrato-impresion.interface';
import { ImprimirAdendaDeUso } from '../../impresiones/impresion.adenda';
import { ImprimirInhumacionICE } from '../../impresiones/necesidad-inmediata/impresion.InhumacionICE';
import { ImprimirInhumacionPersonal } from '../../impresiones/necesidad-inmediata/impresion.InhumacionPersonal';
import { ImprimirInhumacionIC } from '../../impresiones/necesidad-inmediata/impresion.InhumacionIC';
import { ImprimirInhumacionPC } from '../../impresiones/necesidad-inmediata/impresion.InhumacionPC';
import { ImprimirInhumacionPP } from '../../impresiones/necesidad-inmediata/impresion.InhumacionPP';
import { ImprimirInhumacionFamiliar } from '../../impresiones/necesidad-inmediata/impresion.InhumacionFamiliar';
import { ImprimirProgramacionEntierro } from '../../impresiones/necesidad-inmediata/impresion.ProgramacionEntierro';
import { ContratoService } from '../../../../../services/contrato/contrato.service';
import { ImprimirCompromisoPago } from '../../impresiones/impresion.CompromisoPago';

@Component({
  selector: 'app-select-impresion',
  templateUrl: './select-impresion.component.html'
})
export class SelectImpresionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: ContratoImpresion,
    public dialogRef: MatDialogRef<SelectImpresionComponent>,
    private ContratoService: ContratoService
  ) { }

  ImprimirContrato() {
    ImprimirContrato(this.item);
  }

  ImprimirPorcentajeDeUso() {
    ImprimirPorcentajeDeUso(this.item);
  }

  ImprimirAdendaDeUso() {
    ImprimirAdendaDeUso(this.item)
  }

  ImprimirInhumacionICE() {
    ImprimirInhumacionICE(this.item)
  }

  ImprimirInhumacionPersonal() {
    ImprimirInhumacionPersonal(this.item)
  }

  ImprimirInhumacionIC() {
    ImprimirInhumacionIC(this.item)
  }

  ImprimirInhumacionPC() {
    ImprimirInhumacionPC(this.item)
  }

  ImprimirInhumacionPP() {
    ImprimirInhumacionPP(this.item)
  }

  ImprimirInhumacionFamiliar() {
    ImprimirInhumacionFamiliar(this.item)
  }

  ImprimirProgramacionEntierro() {
    ImprimirProgramacionEntierro(this.item)
  }
  ImprimirCompromisoPago() {
    this.ContratoService.CuotasListar(this.item.idContrato)
      .subscribe(resp => {
        ImprimirCompromisoPago(this.item, resp)
      })
  }
}
