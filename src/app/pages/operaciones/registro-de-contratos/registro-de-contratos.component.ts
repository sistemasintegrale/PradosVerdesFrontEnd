import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { Component, OnInit, inject } from '@angular/core';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContratoFilters } from 'src/app/interfaces/contrato/contrato-filters';
import * as moment from 'moment';
import { ContratoService } from 'src/app/services/contrato/contrato.service';
import { TablaVentasDetalle } from 'src/app/interfaces/tabla-ventas/tabla-ventas-detalle';
import { Vendedor } from 'src/app/interfaces/vendedor/vendedor';
import { TablaRegistro } from 'src/app/interfaces/tabla/tabla-registro';
import { GeneralService } from 'src/app/services/general/general.service';
import { MatDialog } from '@angular/material/dialog';
import { MantimientoContratosComponent } from '../mantimiento-contratos/mantimiento-contratos.component';
import { Funerarias } from 'src/app/interfaces/Funerarias/funerarioas';
import Swal from 'sweetalert2';

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
  private contratoService = inject(ContratoService);
  private generalService = inject(GeneralService);
  public dialog = inject(MatDialog);
  private origenVenta: TablaVentasDetalle[] = [];
  public funerarias : Funerarias[]=[];
  public codigoPlan: TablaVentasDetalle[] = [];
  public tipoSepultura: TablaVentasDetalle[] = [];
  public plataforma: TablaVentasDetalle[] = [];
  public manzana: TablaVentasDetalle[] = [];
  public vendedor: Vendedor[] = [];
  public nombrePlan: TablaVentasDetalle[] = [];
  public situacion: TablaVentasDetalle[] = [];
  public tipoPago: TablaRegistro[] = [];
  public sepultura: TablaVentasDetalle[] = [];

  async ngOnInit() {
    this.range = new FormGroup({
      fechaInicio: new FormControl(this.obtenerPrimeraFechaDelAño(), [Validators.required]),
      fechaFinal: new FormControl(new Date().toISOString().substring(0, 10), [Validators.required])
    });
    this.cargarContratos();


    await Promise.all([
      this.generalService.tablaVentasDetalle(1).subscribe(res => this.origenVenta = res),
      this.generalService.tablaVentasDetalle(2).subscribe(res => this.codigoPlan = res),
      this.generalService.tablaVentasDetalle(3).subscribe(res => this.tipoSepultura = res),
      this.generalService.tablaVentasDetalle(4).subscribe(res => this.plataforma = res),
      this.generalService.tablaVentasDetalle(5).subscribe(res => this.manzana = res),
      this.generalService.vendedores().subscribe(res => this.vendedor = res),
      this.generalService.tablaVentasDetalle(13).subscribe(res => this.nombrePlan = res),
      this.generalService.tablaVentasDetalle(14).subscribe(res => this.situacion = res),
      this.generalService.tablaRegistro(97).subscribe(res => this.tipoPago = res),
      this.generalService.tablaVentasDetalle(12).subscribe(res => this.sepultura = res),
      this.generalService.Funerarias().subscribe(res => this.funerarias = res)
    ]);
  }

  getOrigenVenta = (icod: number): string => icod === null ? '' : this.origenVenta.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.origenVenta.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getCodigoPlan = (icod: number): string => icod === null ? '' : this.codigoPlan.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.codigoPlan.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getTipoSepultura = (icod: number): string => icod === null ? '' : this.tipoSepultura.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.tipoSepultura.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getPlataforma = (icod: number): string => icod === null ? '' : this.plataforma.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.plataforma.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getManzana = (icod: number): string => icod === null ? '' : this.manzana.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.manzana.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getVendedor = (icod: number): string => icod === null ? '' : this.vendedor.filter(x => x.vendc_icod_vendedor === icod)[0] === undefined ? "" : this.vendedor.filter(x => x.vendc_icod_vendedor === icod)[0].vendc_vnombre_vendedor!;
  getNombrePlan = (icod: number): string => icod === null ? '' : this.nombrePlan.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.nombrePlan.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getSituacion = (icod: number): string => icod === null ? '' : this.situacion.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.situacion.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;
  getTipoPago = (icod: number): string => icod === null ? '' : this.tipoPago.filter(x => x.tarec_iid_tabla_registro === icod)[0] === undefined ? "" : this.tipoPago.filter(x => x.tarec_iid_tabla_registro === icod)[0].tarec_vdescripcion!;
  getSepultura = (icod: number): string => icod === null ? '' : this.sepultura.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0] === undefined ? "" : this.sepultura.filter(x => x.tabvd_iid_tabla_venta_det === icod)[0].tabvd_vdescripcion!;

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
    this.dialog.open(MantimientoContratosComponent, {
      width: '750px',
      disableClose: true,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarContratos();
      }
    });
  };


  openEdit(contrato: Contrato) {

    console.table(contrato)

    this.dialog.open(MantimientoContratosComponent, {
      width: '750px',
      disableClose: true,
      data : contrato
    }).afterClosed().subscribe(result => {
      if (result) {
        this.cargarContratos();
      }
    });
  }

  eliminar(contrato: Contrato) {
    Swal.fire({
      title: '¿Borrar Contrato?',
      text: `Esta apunto de borrar  ${contrato.cntc_vnumero_contrato}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contratoService.Eliminar(contrato.cntc_icod_contrato)
          .subscribe(resp => {
            Swal.fire(
              'Contrato borrado',
              `${contrato.cntc_vnumero_contrato} fué borrado correctamente`,
              'success'
            );
            this.cargarContratos();
          }
          );
      }
    })
  }

  exportarExcel() {

  }
}
