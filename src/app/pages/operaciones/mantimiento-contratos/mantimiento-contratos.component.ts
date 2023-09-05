import { GeneralService } from './../../../services/general/general.service';
import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedService } from 'src/app/services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TablaVentasDetalle } from 'src/app/interfaces/tabla-ventas/tabla-ventas-detalle';
import { TablaRegistro } from 'src/app/interfaces/tabla/tabla-registro';
import { Vendedor } from 'src/app/interfaces/vendedor/vendedor';

@Component({
  selector: 'app-mantimiento-contratos',
  templateUrl: './mantimiento-contratos.component.html',
  styleUrls: ['./mantimiento-contratos.component.css'],
  providers: [

    provideNgxMask(),
  ],
})
export class MantimientoContratosComponent implements OnInit {
  private comonService = inject(SharedService);
  public registerForm!: FormGroup;
  public origenVenta: TablaVentasDetalle[] = [];
  public codigoPlan: TablaVentasDetalle[] = [];
  public tipoSepultura: TablaVentasDetalle[] = [];
  public plataforma: TablaVentasDetalle[] = [];
  public manzana: TablaVentasDetalle[] = [];
  public vendedor: Vendedor[] = [];
  public nombrePlan: TablaVentasDetalle[] = [];
  public situacion: TablaVentasDetalle[] = [];
  public tipoPago: TablaRegistro[] = [];
  public sepultura: TablaVentasDetalle[] = [];
  private generalService = inject(GeneralService);
  constructor(
    @Inject(MAT_DIALOG_DATA) public contrato: Contrato,
    public dialogRef: MatDialogRef<MantimientoContratosComponent>
  ) {  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      cntc_vnumero_solicitud: new FormControl(this.contrato ? this.contrato.cntc_vnumero_solicitud : '', [Validators.required]),
      cntc_sfecha_contrato: new FormControl(this.contrato ? this.contrato.cntc_sfecha_contrato : this.comonService.obtenerFechaActual(), [Validators.required]),
      cntc_iestado_sol: new FormControl(this.contrato ? this.contrato.cntc_iestado_sol : '', [Validators.required]),
      cntc_icod_vendedor: new FormControl(this.contrato ? this.contrato.cntc_icod_vendedor : '', [Validators.required]),
      cntc_iorigen_venta: new FormControl(this.contrato ? this.contrato.cntc_iorigen_venta : '', [Validators.required]),
      cntc_icod_funeraria: new FormControl(this.contrato ? this.contrato.cntc_icod_funeraria : '', [Validators.required]),
      cntc_itipo_doc_prestamo: new FormControl(this.contrato ? this.contrato.cntc_itipo_doc_prestamo : '', [Validators.required]),
      func_icod_funeraria_prestamo: new FormControl(this.contrato ? this.contrato.func_icod_funeraria_prestamo : '', [Validators.required]),
      cntc_vnombre_contratante: new FormControl(this.contrato ? this.contrato.cntc_vnombre_contratante : '', [Validators.required]),
      cntc_itipo_documento_contratante: new FormControl(this.contrato ? this.contrato.cntc_itipo_documento_contratante : '', [Validators.required]),
      cntc_vdocumento_contratante: new FormControl(this.contrato ? this.contrato.cntc_vdocumento_contratante : '', [Validators.required]),
      cntc_vapellido_paterno_contratante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_paterno_contratante : '', [Validators.required]),
      cntc_vruc_contratante: new FormControl(this.contrato ? this.contrato.cntc_vruc_contratante : '', [Validators.required]),
      cntc_vapellido_materno_contratante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_materno_contratante : '', [Validators.required]),
      cntc_sfecha_nacimineto_contratante: new FormControl(this.contrato ? this.contrato.cntc_sfecha_nacimineto_contratante : '', [Validators.required]),
      cntc_vdireccion_correo_contratante: new FormControl(this.contrato ? this.contrato.cntc_vdireccion_correo_contratante : '', [Validators.required]),
      cntc_vtelefono_contratante: new FormControl(this.contrato ? this.contrato.cntc_vtelefono_contratante : '', [Validators.required]),
      cntc_vdireccion_contratante: new FormControl(this.contrato ? this.contrato.cntc_vdireccion_contratante : '', [Validators.required]),
      cntc_inacionalidad_contratante: new FormControl(this.contrato ? this.contrato.cntc_inacionalidad_contratante : '', [Validators.required]),
      cntc_vnombre_representante: new FormControl(this.contrato ? this.contrato.cntc_vnombre_representante : '', [Validators.required]),
      cntc_vapellido_paterno_representante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_paterno_representante : '', [Validators.required]),
      cntc_ruc_representante: new FormControl(this.contrato ? this.contrato.cntc_ruc_representante : '', [Validators.required]),
      cntc_vapellido_materno_representante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_materno_representante : '', [Validators.required]),
      cntc_itipo_documento_representante: new FormControl(this.contrato ? this.contrato.cntc_itipo_documento_representante : '', [Validators.required]),
      cntc_vdocumento_respresentante: new FormControl(this.contrato ? this.contrato.cntc_vdocumento_respresentante : '', [Validators.required]),
      cntc_sfecha_nacimiento_representante: new FormControl(this.contrato ? this.contrato.cntc_sfecha_nacimiento_representante : '', [Validators.required]),
      cntc_iestado_civil_representante: new FormControl(this.contrato ? this.contrato.cntc_iestado_civil_representante : '', [Validators.required]),
      cntc_inacionalidad_respresentante: new FormControl(this.contrato ? this.contrato.cntc_inacionalidad_respresentante : '', [Validators.required]),
      cntc_vtelefono_representante: new FormControl(this.contrato ? this.contrato.cntc_vtelefono_representante : '', [Validators.required]),
      cntc_vdireccion_representante: new FormControl(this.contrato ? this.contrato.cntc_vdireccion_representante : '', [Validators.required]),
      cntc_vnumero_direccion_representante: new FormControl(this.contrato ? this.contrato.cntc_vnumero_direccion_representante : '', [Validators.required]),
      cntc_vdepartamento_representante: new FormControl(this.contrato ? this.contrato.cntc_vdepartamento_representante : '', [Validators.required]),
      cntc_idistrito_representante: new FormControl(this.contrato ? this.contrato.cntc_idistrito_representante : '', [Validators.required]),
      cntc_vcodigo_postal_representante: new FormControl(this.contrato ? this.contrato.cntc_vcodigo_postal_representante : '', [Validators.required]),
      cntc_icodigo_plan: new FormControl(this.contrato ? this.contrato.cntc_icodigo_plan : '', [Validators.required]),
      cntc_icod_nombre_plan: new FormControl(this.contrato ? this.contrato.cntc_icod_nombre_plan : '', [Validators.required]),
      cntc_nprecio_lista: new FormControl(this.contrato ? this.contrato.cntc_nprecio_lista : '', [Validators.required]),
      cntc_ndescuento: new FormControl(this.contrato ? this.contrato.cntc_ndescuento : '', [Validators.required]),
      cntc_ninhumacion: new FormControl(this.contrato ? this.contrato.cntc_ninhumacion : '', [Validators.required]),
      cntc_icod_deceso: new FormControl(this.contrato ? this.contrato.cntc_icod_deceso : '', [Validators.required]),
      cntc_npago_covid19: new FormControl(this.contrato ? this.contrato.cntc_npago_covid19 : '', [Validators.required]),
      cntc_icod_foma_mante: new FormControl(this.contrato ? this.contrato.cntc_icod_foma_mante : '', [Validators.required]),
      cntc_naporte_fondo: new FormControl(this.contrato ? this.contrato.cntc_naporte_fondo : '', [Validators.required]),
      cntc_nIGV: new FormControl(this.contrato ? this.contrato.cntc_nIGV : '', [Validators.required]),
      cntc_nfinanciamientro: new FormControl(this.contrato ? this.contrato.cntc_nfinanciamientro : '', [Validators.required]),
      cntc_itipo_pago: new FormControl(this.contrato ? this.contrato.cntc_itipo_pago : '', [Validators.required]),
      cntc_ncuota_inicial: new FormControl(this.contrato ? this.contrato.cntc_ncuota_inicial : '', [Validators.required]),
      cntc_inro_cuotas: new FormControl(this.contrato ? this.contrato.cntc_inro_cuotas : '', [Validators.required]),
      cntc_nmonto_cuota: new FormControl(this.contrato ? this.contrato.cntc_nmonto_cuota : '', [Validators.required]),
      cntc_sfecha_cuota: new FormControl(this.contrato ? this.contrato.cntc_sfecha_cuota : '', [Validators.required]),
    });

    Promise.all([
      this.generalService.tablaVentasDetalle(1).subscribe(res => this.origenVenta = res),
      this.generalService.tablaVentasDetalle(2).subscribe(res => this.codigoPlan = res),
      this.generalService.tablaVentasDetalle(3).subscribe(res => this.tipoSepultura = res),
      this.generalService.tablaVentasDetalle(4).subscribe(res => this.plataforma = res),
      this.generalService.tablaVentasDetalle(5).subscribe(res => this.manzana = res),
      this.generalService.vendedores().subscribe(res => this.vendedor = res),
      this.generalService.tablaVentasDetalle(13).subscribe(res => this.nombrePlan = res),
      this.generalService.tablaVentasDetalle(14).subscribe(res => this.situacion = res),
      this.generalService.tablaRegistro(97).subscribe(res => this.tipoPago = res),
      this.generalService.tablaVentasDetalle(12).subscribe(res => this.sepultura = res)
    ]);
  }

  close() {
    this.dialogRef.close();
  }
  GuardarContrato() {

  }
}
