import { filter } from 'rxjs';
import { AuthService } from './../../../services/auth/auth.service';
import { GeneralService } from './../../../services/general/general.service';
import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedService } from 'src/app/services/shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TablaVentasDetalle } from 'src/app/interfaces/tabla-ventas/tabla-ventas-detalle';
import { TablaRegistro } from 'src/app/interfaces/tabla/tabla-registro';
import { Vendedor } from 'src/app/interfaces/vendedor/vendedor';
import { Funerarias } from 'src/app/interfaces/Funerarias/funerarioas';
import { Distrito } from 'src/app/interfaces/Distrito/distrito';
import { Parametro } from 'src/app/interfaces/Parametro/parametro';
import { ContratoService } from 'src/app/services/contrato/contrato.service';
import Swal from 'sweetalert2';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@Component({
  selector: 'app-mantimiento-contratos',
  templateUrl: './mantimiento-contratos.component.html'
})
export class MantimientoContratosComponent implements OnInit {

  public chargeDniData = false;
  private comonService = inject(SharedService);
  public registerForm!: FormGroup;
  public origenVenta: TablaVentasDetalle[] = [];
  public funerarias: Funerarias[] = [];
  public docPago: TablaRegistro[] = [];
  public tipoDoc: TablaRegistro[] = [];
  public nacionalidad: TablaRegistro[] = [];
  public estadoCivil: TablaRegistro[] = [];
  public distritos: Distrito[] = [];
  public codigoPlan: TablaVentasDetalle[] = [];
  public deceso: TablaVentasDetalle[] = [];
  public tipoSepultura: TablaVentasDetalle[] = [];
  public plataforma: TablaVentasDetalle[] = [];
  public manzana: TablaVentasDetalle[] = [];
  public vendedor: Vendedor[] = [];
  public nombrePlan: TablaVentasDetalle[] = [];
  public situacion: TablaVentasDetalle[] = [];
  public tipoPago: TablaRegistro[] = [];
  public sepultura: TablaVentasDetalle[] = [];
  public fomaMantenimiento: TablaVentasDetalle[] = [];
  public parametro!: Parametro;
  private generalService = inject(GeneralService);
  private contratoService = inject(ContratoService);
  public authService = inject(AuthService);
  buttonSave!: boolean;
  @ViewChild('miInput') miInput!: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public contrato: Contrato,
    public dialogRef: MatDialogRef<MantimientoContratosComponent>
  ) { }




  async ngOnInit() {
    debugger
    this.buttonSave = this.authService.usuario.usua_indicador_asesor === true ? true : this.authService.usuario.usua_icod_usuario === 4 ? true : false;

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
      this.generalService.tablaVentasDetalle(12).subscribe(res => this.sepultura = res),
      this.generalService.tablaVentasDetalle(20).subscribe(res => this.deceso = res),
      this.generalService.tablaVentasDetalle(21).subscribe(res => this.fomaMantenimiento = res),
      this.generalService.Funerarias().subscribe(res => this.funerarias = res),
      this.generalService.tablaRegistro(98).subscribe(res => this.docPago = res),
      this.generalService.tablaRegistro(96).subscribe(res => this.tipoDoc = res),
      this.generalService.tablaRegistro(95).subscribe(res => this.nacionalidad = res),
      this.generalService.tablaRegistro(78).subscribe(res => this.estadoCivil = res),
      this.generalService.Distritos().subscribe(res => this.distritos = res),

    ]);

    console.table(this.nombrePlan)

    this.registerForm = new FormGroup({
      serie: new FormControl(this.contrato ? this.contrato.cntc_vnumero_contrato?.slice(0, 4) : '0000000', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]),
      cntc_vnumero_contrato: new FormControl(this.contrato ? this.contrato.cntc_vnumero_contrato?.slice(4) : '', [Validators.required]),
      cntc_sfecha_contrato: new FormControl(this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_contrato!) : this.comonService.obtenerFechaActual(), [Validators.required]),
      cntc_icod_situacion: new FormControl(this.contrato ? this.contrato.cntc_icod_situacion : 331, [Validators.required]),
      cntc_icod_vendedor: new FormControl(this.contrato ? this.contrato.cntc_icod_vendedor : this.authService.usuario.vendc_icod_vendedor, [Validators.required]),
      cntc_iorigen_venta: new FormControl(this.contrato ? this.contrato.cntc_iorigen_venta : null, [Validators.required]),
      cntc_icod_funeraria: new FormControl(this.contrato ? this.contrato.cntc_icod_funeraria : null, [Validators.required]),
      cntc_itipo_doc_prestamo: new FormControl(this.contrato ? this.contrato.cntc_itipo_doc_prestamo : null, [Validators.required]),
      func_icod_funeraria_prestamo: new FormControl(this.contrato ? this.contrato.func_icod_funeraria_prestamo : null, [Validators.required]),
      cntc_vnombre_contratante: new FormControl(this.contrato ? this.contrato.cntc_vnombre_contratante : null, [Validators.required]),
      cntc_itipo_documento_contratante: new FormControl(this.contrato ? this.contrato.cntc_itipo_documento_contratante : null, [Validators.required]),
      cntc_vdocumento_contratante: new FormControl(this.contrato ? this.contrato.cntc_vdocumento_contratante : '', [Validators.required]),
      cntc_vapellido_paterno_contratante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_paterno_contratante : '', [Validators.required]),
      cntc_vruc_contratante: new FormControl(this.contrato ? this.contrato.cntc_vruc_contratante : '', [Validators.required]),
      cntc_vapellido_materno_contratante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_materno_contratante : '', [Validators.required]),
      cntc_sfecha_nacimineto_contratante: new FormControl(this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_nacimineto_contratante!) : null, [Validators.required]),
      cntc_vdireccion_correo_contratante: new FormControl(this.contrato ? this.contrato.cntc_vdireccion_correo_contratante : '', [Validators.required]),
      cntc_vtelefono_contratante: new FormControl(this.contrato ? this.contrato.cntc_vtelefono_contratante : '', [Validators.required]),
      cntc_vdireccion_contratante: new FormControl(this.contrato ? this.contrato.cntc_vdireccion_contratante : '', [Validators.required]),
      cntc_inacionalidad_contratante: new FormControl(this.contrato ? this.contrato.cntc_inacionalidad_contratante : 669, [Validators.required]),
      cntc_vnombre_representante: new FormControl(this.contrato ? this.contrato.cntc_vnombre_representante : '', [Validators.required]),
      cntc_vapellido_paterno_representante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_paterno_representante : '', [Validators.required]),
      cntc_ruc_representante: new FormControl(this.contrato ? this.contrato.cntc_ruc_representante : '', [Validators.required]),
      cntc_vapellido_materno_representante: new FormControl(this.contrato ? this.contrato.cntc_vapellido_materno_representante : '', [Validators.required]),
      cntc_itipo_documento_representante: new FormControl(this.contrato ? this.contrato.cntc_itipo_documento_representante : null, [Validators.required]),
      cntc_vdocumento_respresentante: new FormControl(this.contrato ? this.contrato.cntc_vdocumento_respresentante : '', [Validators.required]),
      cntc_sfecha_nacimiento_representante: new FormControl(this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_nacimiento_representante!) : null, [Validators.required]),
      cntc_iestado_civil_representante: new FormControl(this.contrato ? this.contrato.cntc_iestado_civil_representante : null, [Validators.required]),
      cntc_inacionalidad_respresentante: new FormControl(this.contrato ? this.contrato.cntc_inacionalidad_respresentante : null, [Validators.required]),
      cntc_vtelefono_representante: new FormControl(this.contrato ? this.contrato.cntc_vtelefono_representante : '', [Validators.required]),
      cntc_vdireccion_representante: new FormControl(this.contrato ? this.contrato.cntc_vdireccion_representante : '', [Validators.required]),
      cntc_vnumero_direccion_representante: new FormControl(this.contrato ? this.contrato.cntc_vnumero_direccion_representante : '', [Validators.required]),
      cntc_vdepartamento_representante: new FormControl(this.contrato ? this.contrato.cntc_vdepartamento_representante : '', [Validators.required]),
      cntc_idistrito_representante: new FormControl(this.contrato ? this.contrato.cntc_idistrito_representante : null, [Validators.required]),
      cntc_vcodigo_postal_representante: new FormControl(this.contrato ? this.contrato.cntc_vcodigo_postal_representante : '', [Validators.required]),
      cntc_icodigo_plan: new FormControl(this.contrato ? this.contrato.cntc_icodigo_plan : null, [Validators.required]),
      cntc_icod_nombre_plan: new FormControl(this.contrato ? this.contrato.cntc_icod_nombre_plan : null, [Validators.required]),
      cntc_nprecio_lista: new FormControl(this.contrato ? this.contrato.cntc_nprecio_lista : '0.00', [Validators.required]),
      cntc_ndescuento: new FormControl(this.contrato ? this.contrato.cntc_ndescuento : '0.00', [Validators.required]),
      cntc_ninhumacion: new FormControl(this.contrato ? this.contrato.cntc_ninhumacion : '0.00', [Validators.required]),
      cntc_icod_deceso: new FormControl(this.contrato ? this.contrato.cntc_icod_deceso : null, [Validators.required]),
      cntc_npago_covid19: new FormControl(this.contrato ? this.contrato.cntc_npago_covid19 : '0.00', [Validators.required]),
      cntc_icod_foma_mante: new FormControl(this.contrato ? this.contrato.cntc_icod_foma_mante : null, [Validators.required]),
      cntc_naporte_fondo: new FormControl(this.contrato ? this.contrato.cntc_naporte_fondo : '0.00', [Validators.required]),
      cntc_nIGV: new FormControl(this.contrato ? this.contrato.cntc_nIGV : '0.00', [Validators.required]),
      cntc_nfinanciamientro: new FormControl(this.contrato ? this.contrato.cntc_nfinanciamientro : '0.00', [Validators.required]),
      cntc_itipo_pago: new FormControl(this.contrato ? this.contrato.cntc_itipo_pago : null, [Validators.required]),
      cntc_ncuota_inicial: new FormControl(this.contrato ? this.contrato.cntc_ncuota_inicial : '0.00', [Validators.required]),
      cntc_inro_cuotas: new FormControl(this.contrato ? this.contrato.cntc_inro_cuotas : null, [Validators.required]),
      cntc_nmonto_cuota: new FormControl(this.contrato ? this.contrato.cntc_nmonto_cuota : '0.00', [Validators.required]),
      cntc_sfecha_cuota: new FormControl(this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_cuota!) : null, [Validators.required]),
      cntc_sfecha_inicio_pago: new FormControl(this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_inicio_pago!) : null, [Validators.required]),
      cntc_sfecha_fin_pago: new FormControl(this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_fin_pago!) : null, [Validators.required]),
      cntc_itipo_sepultura: new FormControl(this.contrato ? this.contrato.cntc_itipo_sepultura : null, [Validators.required]),
    });
    this.registerForm.get('cntc_icod_situacion')?.disable();
    if (this.contrato === null) {
      this.generalService.Parametro().subscribe(
        res => {
          this.registerForm.get('serie')?.setValue(res.rgpmc_vserie_contrato);
          this.miInput.nativeElement.focus();
        }
      )
    }
    if (this.authService.usuario.vendc_icod_vendedor !== 0)
      this.registerForm.get('cntc_icod_vendedor')?.disable();

    if (this.contrato === null || this.registerForm.get('cntc_iorigen_venta')?.value !== 2)
      this.registerForm.get('cntc_icod_funeraria')?.disable()
  }

  close() {
    this.dialogRef.close();
  }
  GuardarContrato() {
    this.registerForm.get('cntc_vnumero_contrato')?.setValue(this.registerForm.get('serie')?.value +
      this.registerForm.get('cntc_vnumero_contrato')?.value);


    this.contratoService.Guardar(this.registerForm.value)
      .subscribe({
        next: ((data) => {
          debugger
          if (data > 0) {
            this.dialogRef.close(data);
            Swal.fire(
              'Contrato Guardado',
              `Contrato ${this.registerForm.get('cntc_vnumero_contrato')?.value} fué creado correctamente`,
              'success'
            );
          }
        })
      }
      );
  }

  numeroChange() {
    let valor: string = this.registerForm.get('cntc_vnumero_contrato')!.value;
    valor = valor.replace(/\D/g, '');
    while (valor.length < 7) {
      valor = '0' + valor;
    }
    valor = valor.slice(valor.length - 7);
    this.registerForm.get('cntc_vnumero_contrato')?.setValue(valor);
  }






  serieAnterior!: string;






  onBlur(event: any) {
    let serie: string = this.registerForm.get('serie')!.value;
    let numero: string = this.registerForm.get('cntc_vnumero_contrato')!.value;
    const numeroContrato = serie + numero;
    if (this.serieAnterior === numeroContrato) return;
    this.serieAnterior = numeroContrato;
    this.contratoService.ValidarSerie(numeroContrato).subscribe(res => {
      if (res) {


        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ya existe contro con el número ingresado!',
          showConfirmButton: false,
          timer: 1000
        })

        this.miInput.nativeElement.focus();
      }

    });
  }

  DniChange() {
    const dni = this.registerForm.get('cntc_vdocumento_respresentante')!.value;
    if (dni.length == 8) {
      this.chargeDniData = true;
      this.comonService.ObtenerDatosDni(dni)
        .subscribe(resp => {
          this.registerForm.get('cntc_vnombre_representante')?.setValue(resp.nombres);
          this.registerForm.get('cntc_vapellido_paterno_representante')?.setValue(resp.apellidoPaterno);
          this.registerForm.get('cntc_vapellido_materno_representante')?.setValue(resp.apellidoMaterno);
          this.chargeDniData = false;
        })
    }

  }

  DniTitularChange() {

    const dni = this.registerForm.get('cntc_vdocumento_contratante')!.value;
    const tipoDoc = this.registerForm.get('cntc_itipo_documento_contratante')!.value;
    if (dni.length == 8 && tipoDoc == 671) {
      debugger
      this.chargeDniData = true;
      this.comonService.ObtenerDatosDni(dni)
        .subscribe(resp => {
          this.registerForm.get('cntc_vnombre_contratante')?.setValue(resp.nombres);
          this.registerForm.get('cntc_vapellido_paterno_contratante')?.setValue(resp.apellidoPaterno);
          this.registerForm.get('cntc_vapellido_materno_contratante')?.setValue(resp.apellidoMaterno);
          this.chargeDniData = false;
        })
    }
  }

  TipoEstapcioChange(event: any) {
    const valorSeleccionado = event.target.value;
    if (valorSeleccionado == 0) return;
    const TipoEspacio = this.tipoSepultura.filter(x => x.tabvd_iid_tabla_venta_det == valorSeleccionado)[0]
    if (TipoEspacio == undefined) return;

    this.generalService.tablaVentasDetalle(2).subscribe(res => {


      const codigoPlan = res.filter(x => x.tabvd_iid_tabla_venta_det === TipoEspacio.tabvd_icod_ref)[0]
      console.log(codigoPlan);
      this.registerForm.get('cntc_icodigo_plan')?.setValue(codigoPlan.tabvd_iid_tabla_venta_det);
    })
  }

  OrigenChange(event: any) {
    const valorSeleccionado = event.target.value;

    if (valorSeleccionado == 2)
      this.registerForm.get('cntc_icod_funeraria')?.enable()
    else {
      this.registerForm.get('cntc_icod_funeraria')?.disable()
      this.registerForm.get('cntc_icod_funeraria')?.setValue(0)
    }

  }

  TipoSepulturaFilter() {
    const tipoPlan = this.registerForm.get('cntc_icodigo_plan')?.value;
    const nombrePlan = this.registerForm.get('cntc_icod_nombre_plan')?.value;

    this.generalService.TipoSepulturaByPlan(tipoPlan, nombrePlan)
      .subscribe(res => this.tipoSepultura = res)
  }
}
