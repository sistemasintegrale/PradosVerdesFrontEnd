import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { Component, OnInit, inject } from '@angular/core';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContratoFilters } from 'src/app/interfaces/contrato/contrato-filters';
import * as moment from 'moment';
import { ContratoService } from 'src/app/services/contrato/contrato.service';

@Component({
  selector: 'app-registro-de-contratos',
  templateUrl: './registro-de-contratos.component.html',
  styleUrls: ['./registro-de-contratos.component.css']
})
export class RegistroDeContratosComponent implements OnInit {

  public cargando = true;
  public cargandoExcel = false;
  public contratos!: Contrato[];
  public contrato!: Contrato;
  private filters = {} as ContratoFilters;
  public range!: FormGroup
  private fb = inject(FormBuilder);
  private contratoService = inject(ContratoService);




  ngOnInit(): void {
    this.range = new FormGroup({
      fechaInicio: new FormControl(this.obtenerPrimeraFechaDelAño(), [Validators.required]),
      fechaFinal: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required])
    });
    this.cargarContratos();
  }

  obtenerPrimeraFechaDelAño(): string {
    const year = new Date().getFullYear(); // Obtener el año actual
    const firstDay = new Date(year, 0, 1); // Crear una fecha para el primer día del año

    // Formatear la fecha manualmente
    const formattedDate = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-${firstDay.getDate().toString().padStart(2, '0')}`;

    return formattedDate;
  }

  convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('-'); // Dividir la fecha en partes: [año, mes, día]
    if (parts.length !== 3) {
      return inputDate; // Devolver la fecha original si el formato no es válido
    }
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  }

  cargarContratos() {
    this.contratos = [];
    this.cargando = true;
    this.filters.fechaInicio = this.convertDateFormat(this.range.value.fechaInicio);
    this.filters.fechaFinal = this.convertDateFormat(this.range.value.fechaFinal);
    this.contratoService.ListarContratosPorFechas(this.filters).subscribe((resp) => {
      this.contratos = resp
      this.cargando = false;
    });
  }

  openAdd() {
  }

  openEdit(contrato: Contrato) {
  }

  eliminar(contrato: Contrato) {
  }

  exportarExcel() {

  }
}
