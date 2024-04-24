import { AuthService } from './../../../services/auth/auth.service';
import { GeneralService } from './../../../services/general/general.service';
import { Contrato } from 'src/app/interfaces/contrato/contrato';
import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
import { TipoSepulturaCab } from 'src/app/interfaces/tipo-sepultura/tipo.sepultura.cab';
import { TipoSepulturaDetalle } from 'src/app/interfaces/tipo-sepultura/tipo.sepultura.detalle';
import { Cuota } from '../../../interfaces/cuota/Cuota';

@Component({
  selector: 'app-mantimiento-contratos',
  templateUrl: './mantimiento-contratos.component.html'
})
export class MantimientoContratosComponent implements OnInit {
  public CustomCuota = false;
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
  public religiones: TablaVentasDetalle[] = [];
  public tipoDeceso: TablaVentasDetalle[] = [];
  public tipoSepulturaCab: TipoSepulturaCab[] = [];
  public tipoSepulturaCabSelect?: TipoSepulturaCab;
  public tipoSepulturaDet: TipoSepulturaDetalle[] = [];
  public parametro!: Parametro;
  private generalService = inject(GeneralService);
  private contratoService = inject(ContratoService);
  public authService = inject(AuthService);
  public parentesco: TablaVentasDetalle[] = [];
  public documentoFinanciado: TablaVentasDetalle[] = []
  public tipoContrato: TablaVentasDetalle[] = []

  isLoadingResults = true;

  permision!: boolean;
  @ViewChild('miInput') miInput!: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public contrato: Contrato,
    public dialogRef: MatDialogRef<MantimientoContratosComponent>
  ) { }

  getEdit(): boolean {

    if (this.permision) {
      if (this.contrato) {
        if (this.contrato.cntc_icod_situacion == 331 && this.contrato.cntc_vorigen_registro == 'WEB') {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }

    } else {
      return false
    }

  }


  async ngOnInit() {

    this.permision = this.authService.usuario.usua_indicador_asesor === true ? true : this.authService.usuario.usua_icod_usuario === 4 ? true : false;

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
      this.generalService.tablaVentasDetalle(19).subscribe(res => this.religiones = res),
      this.generalService.tablaVentasDetalle(17).subscribe(res => this.tipoDeceso = res),
      this.generalService.tablaVentasDetalle(29).subscribe(res => this.parentesco = res),
      this.generalService.tablaVentasDetalle(30).subscribe(res => this.documentoFinanciado = res),
      this.generalService.tablaVentasDetalle(31).subscribe(res => this.tipoContrato = res)
    ]);

    this.registerForm = new FormGroup({
      cntc_icod_contrato: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_contrato : 0), disabled: !this.getEdit() }),
      serie: new FormControl({ value: (this.contrato ? this.contrato.cntc_vnumero_contrato?.slice(0, 4) : '0000000'), disabled: true }),
      cntc_vnumero_contrato: new FormControl({ value: (this.contrato ? this.contrato.cntc_vnumero_contrato?.slice(4) : ''), disabled: !this.getEdit() }),
      cntc_sfecha_contrato: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_contrato!) : this.comonService.obtenerFechaActual()), disabled: !this.getEdit() }),
      cntc_icod_situacion: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_situacion : 331), disabled: !this.getEdit() }),
      cntc_icod_vendedor: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_vendedor : this.authService.usuario.vendc_icod_vendedor), disabled: !this.getEdit() }),
      cntc_iorigen_venta: new FormControl({ value: (this.contrato ? this.contrato.cntc_iorigen_venta : null), disabled: !this.getEdit() }),
      cntc_icod_funeraria: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_funeraria : null), disabled: !this.getEdit() }),
      cntc_itipo_doc_prestamo: new FormControl({ value: (this.contrato ? this.contrato.cntc_itipo_doc_prestamo : null), disabled: !this.getEdit() }),

      cntc_vnombre_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vnombre_contratante : null), disabled: !this.getEdit() }),
      cntc_itipo_documento_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_itipo_documento_contratante : null), disabled: !this.getEdit() }),
      cntc_vdocumento_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdocumento_contratante : ''), disabled: !this.getEdit() }),
      cntc_vapellido_paterno_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vapellido_paterno_contratante : ''), disabled: !this.getEdit() }),
      cntc_vruc_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vruc_contratante : ''), disabled: !this.getEdit() }),
      cntc_vapellido_materno_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vapellido_materno_contratante : ''), disabled: !this.getEdit() }),
      cntc_sfecha_nacimineto_contratante: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_nacimineto_contratante!) : null), disabled: !this.getEdit() }),
      cntc_vdireccion_correo_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdireccion_correo_contratante : ''), disabled: !this.getEdit() }),
      cntc_vtelefono_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vtelefono_contratante : ''), disabled: !this.getEdit() }),
      cntc_vdireccion_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdireccion_contratante : ''), disabled: !this.getEdit() }),
      cntc_inacionalidad_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_inacionalidad_contratante : 669), disabled: !this.getEdit() }),
      cntc_iestado_civil_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_iestado_civil_contratante : null), disabled: !this.getEdit() }),
      cntc_iparentesco_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_iparentesco_contratante : null), disabled: !this.getEdit() }),
      cntc_vparentesco_contratante: new FormControl({ value: (this.contrato ? this.contrato.cntc_vparentesco_contratante : ''), disabled: !this.getEdit() }),

      cntc_vnombre_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vnombre_contratante2 : null), disabled: !this.getEdit() }),
      cntc_itipo_documento_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_itipo_documento_contratante2 : null), disabled: !this.getEdit() }),
      cntc_vdocumento_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdocumento_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_vapellido_paterno_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vapellido_paterno_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_vruc_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vruc_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_vapellido_materno_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vapellido_materno_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_sfecha_nacimineto_contratante2: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_nacimineto_contratante2!) : null), disabled: !this.getEdit() }),
      cntc_vdireccion_correo_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdireccion_correo_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_vtelefono_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vtelefono_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_vdireccion_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdireccion_contratante2 : ''), disabled: !this.getEdit() }),
      cntc_inacionalidad_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_inacionalidad_contratante2 : 669), disabled: !this.getEdit() }),
      cntc_iestado_civil_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_iestado_civil_contratante2 : null), disabled: !this.getEdit() }),
      cntc_iparentesco_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_iparentesco_contratante2 : null), disabled: !this.getEdit() }),
      cntc_vparentesco_contratante2: new FormControl({ value: (this.contrato ? this.contrato.cntc_vparentesco_contratante2 : ''), disabled: !this.getEdit() }),

      cntc_icodigo_plan: new FormControl({ value: (this.contrato ? this.contrato.cntc_icodigo_plan : null), disabled: !this.getEdit() }),
      cntc_icod_nombre_plan: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_nombre_plan : null), disabled: !this.getEdit() }),
      cntc_itipo_sepultura: new FormControl({ value: (this.contrato ? this.contrato.cntc_itipo_sepultura : null), disabled: !this.getEdit() }),
      cntc_nprecio_lista: new FormControl({ value: (this.contrato ? this.contrato.cntc_nprecio_lista : '0.00'), disabled: !this.getEdit() }),
      cntc_ndescuento: new FormControl({ value: (this.contrato ? this.contrato.cntc_ndescuento : '0.00'), disabled: !this.getEdit() }),
      cntc_ninhumacion: new FormControl({ value: (this.contrato ? this.contrato.cntc_ninhumacion : '0.00'), disabled: !this.getEdit() }),
      cntc_icod_deceso: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_deceso : null), disabled: !this.getEdit() }),
      cntc_npago_covid19: new FormControl({ value: (this.contrato ? this.contrato.cntc_npago_covid19 : '0.00'), disabled: !this.getEdit() }),
      cntc_naporte_fondo: new FormControl({ value: (this.contrato ? this.contrato.cntc_naporte_fondo : '0.00'), disabled: !this.getEdit() }),
      cntc_nIGV: new FormControl({ value: (this.contrato ? this.contrato.cntc_nIGV : '0.00'), disabled: !this.getEdit() }),
      cntc_nfinanciamientro: new FormControl({ value: (this.contrato ? this.contrato.cntc_nfinanciamientro : '0.00'), disabled: !this.getEdit() }),
      cntc_itipo_pago: new FormControl({ value: (this.contrato ? this.contrato.cntc_itipo_pago : null), disabled: !this.getEdit() }),
      cntc_ncuota_inicial: new FormControl({ value: (this.contrato ? this.contrato.cntc_ncuota_inicial : '0.00'), disabled: !this.getEdit() }),
      cntc_inro_cuotas: new FormControl({ value: (this.contrato ? this.contrato.cntc_inro_cuotas : '0'), disabled: !this.getEdit() }),
      cntc_nmonto_cuota: new FormControl({ value: (this.contrato ? this.contrato.cntc_nmonto_cuota : '0.00'), disabled: !this.getEdit() }),
      cntc_sfecha_cuota: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_cuota!) : null), disabled: !this.getEdit() }),
      cntc_sfecha_inicio_pago: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_inicio_pago!) : null), disabled: !this.getEdit() }),
      cntc_sfecha_fin_pago: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_fin_pago!) : null), disabled: !this.getEdit() }),
      cntc_icod_contrato_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_contrato_fallecido : 0), disabled: !this.getEdit() }),
      cntc_vnombre_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_vnombre_fallecido : ''), disabled: !this.getEdit() }),
      cntc_vapellido_paterno_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_vapellido_paterno_fallecido : ''), disabled: !this.getEdit() }),
      cntc_vapellido_materno_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_vapellido_materno_fallecido : ''), disabled: !this.getEdit() }),
      cntc_sfecha_nac_fallecido: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_nac_fallecido!) : ''), disabled: !this.getEdit() }),
      cntc_sfecha_fallecimiento: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_fallecimiento!) : ''), disabled: !this.getEdit() }),
      cntc_sfecha_entierro: new FormControl({ value: (this.contrato ? this.comonService.DateToInput(this.contrato.cntc_sfecha_entierro!) : ''), disabled: !this.getEdit() }),
      cntc_itipo_documento_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_itipo_documento_fallecido : 0), disabled: !this.getEdit() }),
      cntc_vdocumento_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdocumento_fallecido : ''), disabled: !this.getEdit() }),
      cntc_inacionalidad: new FormControl({ value: (this.contrato ? this.contrato.cntc_inacionalidad : 0), disabled: !this.getEdit() }),
      cntc_vdireccion_fallecido: new FormControl({ value: (this.contrato ? this.contrato.cntc_vdireccion_fallecido : ''), disabled: !this.getEdit() }),
      cntc_icod_religiones: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_religiones : 0), disabled: !this.getEdit() }),
      cntc_icod_tipo_deceso: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_tipo_deceso : 0), disabled: !this.getEdit() }),
      cntc_vobservacion: new FormControl({ value: (this.contrato ? this.contrato.cntc_vobservacion : ''), disabled: !this.getEdit() }),
      cntc_nsaldo: new FormControl({ value: (this.contrato ? this.contrato.cntc_nsaldo : '0.00'), disabled: !this.getEdit() }),
      cntc_nprecio_total: new FormControl({ value: (this.contrato ? this.contrato.cntc_nprecio_total : '0.00'), disabled: !this.getEdit() }),
      cntc_vcapacidad_contrato: new FormControl({ value: (this.contrato ? this.contrato.cntc_vcapacidad_contrato : ''), disabled: !this.getEdit() }),
      cntc_vcapacidad_total: new FormControl({ value: (this.contrato ? this.contrato.cntc_vcapacidad_total : ''), disabled: !this.getEdit() }),
      cntc_vurnas: new FormControl({ value: (this.contrato ? this.contrato.cntc_vurnas : ''), disabled: !this.getEdit() }),
      cntc_vservico_inhumacion: new FormControl({ value: (this.contrato ? this.contrato.cntc_vservico_inhumacion : ''), disabled: !this.getEdit() }),
      cntc_icod_plataforma: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_plataforma : null), disabled: !this.getEdit() }),
      cntc_idocumento_financiado: new FormControl({ value: (this.contrato ? this.contrato.cntc_idocumento_financiado : null), disabled: !this.getEdit() }),
      cntc_icod_tipo_contrato: new FormControl({ value: (this.contrato ? this.contrato.cntc_icod_tipo_contrato : null), disabled: !this.getEdit() }),

    })
    this.registerForm.get('cntc_icod_situacion')?.disable({ onlySelf: false });
    if (this.contrato === null) {
      this.generalService.Parametro().subscribe(
        res => {
          this.registerForm.get('serie')?.setValue(res.rgpmc_vserie_contrato);
          this.miInput.nativeElement.focus();
        }
      )
    }
    if (this.authService.usuario.vendc_icod_vendedor !== 0)
      this.registerForm.get('cntc_icod_vendedor')?.disable({ onlySelf: false });

    if (this.contrato === null || this.registerForm.get('cntc_iorigen_venta')?.value !== 2)
      this.registerForm.get('cntc_icod_funeraria')?.disable({ onlySelf: false })
    this.isLoadingResults = false;
    if (this.contrato) {
      this.SetValues();
    }

  }

  SetValues() {
    debugger
    const tipoPlan = this.registerForm.get('cntc_icodigo_plan')?.value;
    const nombrePlan = this.registerForm.get('cntc_icod_nombre_plan')?.value;
    this.generalService.TipoSepulturaByPlan(tipoPlan, nombrePlan)
      .subscribe(res => {
        this.tipoSepulturaCab = res;
        this.TipoSepulturaChange();
      });


  }

  close() {
    this.dialogRef.close();
  }
  GuardarContrato() {
    debugger;
    let GuargarCuota = false;
    this.isLoadingResults = true;
    const cntc_icod_contrato = this.registerForm.get('cntc_icod_contrato')?.value;
    if (cntc_icod_contrato == 0 && cntc_icod_contrato != null) {
      GuargarCuota = true;
    }
    if (cntc_icod_contrato > 0) {

      this.contratoService.CuotasListar(cntc_icod_contrato)
        .subscribe((res: Cuota[]) => {
          if (res.length == 0) {
            GuargarCuota = true;
          } else {
            if (res.some(x => x.cntc_icod_situacion !== 338)) {
              GuargarCuota = false;
            } else {
              GuargarCuota = true;
            }
          }
          this.Save(GuargarCuota);
        })
    } else {
      this.Save(GuargarCuota)
    }





  }

  Save(guardarCuota: boolean) {
    this.contratoService.Guardar(this.registerForm.getRawValue(), guardarCuota)
      .subscribe({
        next: ((data) => {
          if (data.data > 0) {
            this.dialogRef.close(data);
            Swal.fire(
              'Contrato Guardado',
              `Contrato ${this.registerForm.get('cntc_vnumero_contrato')?.value} fué creado correctamente`,
              'success'
            );
          } else {
            this.isLoadingResults = false;
            Swal.fire(
              'Error al Guardar',
              `${data.mensaje}`,
              'error'
            );
          }
        }),
        error: ((error) => {
          // Manejo de errores
          console.error('Ocurrió un error:', error);
          this.isLoadingResults = false;
          Swal.fire(
            'Error',
            'Ocurrió un error al guardar el contrato. Por favor, inténtalo de nuevo más tarde.',
            'error'
          );
        })
      });
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
    if (this.registerForm.get('cntc_icod_contrato')!.value != 0) return;
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

  DniTitularChange2() {

    const dni = this.registerForm.get('cntc_vdocumento_contratante2')!.value;
    const tipoDoc = this.registerForm.get('cntc_itipo_documento_contratante2')!.value;
    if (dni.length == 8 && tipoDoc == 671) {
      this.chargeDniData = true;
      this.comonService.ObtenerDatosDni(dni)
        .subscribe(resp => {
          this.registerForm.get('cntc_vnombre_contratante2')?.setValue(resp.nombres);
          this.registerForm.get('cntc_vapellido_paterno_contratante2')?.setValue(resp.apellidoPaterno);
          this.registerForm.get('cntc_vapellido_materno_contratante2')?.setValue(resp.apellidoMaterno);
          this.chargeDniData = false;
        })
    }
  }

  DniFallecidoChange() {
    const dni = this.registerForm.get('cntc_vdocumento_fallecido')!.value;
    const tipoDoc = this.registerForm.get('cntc_itipo_documento_fallecido')!.value;
    if (dni.length == 8 && tipoDoc == 671) {
      this.chargeDniData = true;
      this.comonService.ObtenerDatosDni(dni)
        .subscribe(resp => {
          this.registerForm.get('cntc_vnombre_fallecido')?.setValue(resp.nombres);
          this.registerForm.get('cntc_vapellido_paterno_fallecido')?.setValue(resp.apellidoPaterno);
          this.registerForm.get('cntc_vapellido_materno_fallecido')?.setValue(resp.apellidoMaterno);
          this.chargeDniData = false;
        })
    }
  }

  TipoSepulturaChange() {
    debugger
    this.tipoSepulturaCabSelect = this.tipoSepulturaCab
      .filter(x => x.icod_nombre_plan == this.registerForm.get('cntc_icod_nombre_plan')?.value &&
        x.icod_tipo_plan == this.registerForm.get('cntc_icodigo_plan')?.value &&
        x.icod_tipo_sepultura == this.registerForm.get('cntc_itipo_sepultura')?.value)[0];
    if (this.tipoSepulturaCabSelect != null) {

      this.generalService.TipoSepulturaDetalle(this.tipoSepulturaCabSelect.id)
        .subscribe(resp => {
          debugger
          this.tipoSepulturaDet = resp;
          this.CustomCuota = !(resp.length > 0);
        })



      this.registerForm.get('cntc_nprecio_lista')?.setValue(this.tipoSepulturaCabSelect.nprecio_lista);
    } else {
      this.tipoSepulturaDet = [];
      // this.registerForm.get('cntc_nprecio_lista')?.setValue('00.00');
    }


  }

  OrigenChange(event: any) {
    const valorSeleccionado = event.target.value;

    if (valorSeleccionado == 2)
      this.registerForm.get('cntc_icod_funeraria')?.enable()
    else {
      this.registerForm.get('cntc_icod_funeraria')?.disable({ onlySelf: false })
      this.registerForm.get('cntc_icod_funeraria')?.setValue(0)
    }
  }

  numCuotasChange(event: any) {
    const valorSeleccionado = event.icantidad_cuotas;
    const selectedDet = this.tipoSepulturaDet.filter(x => x.icantidad_cuotas == valorSeleccionado)[0];
    //this.registerForm.get('cntc_ncuota_inicial')?.setValue(this.tipoSepulturaCabSelect?.ncuota_inicial);
    if (selectedDet) {
      this.registerForm.get('cntc_nmonto_cuota')?.setValue(selectedDet.nmonto);
    }
    this.CalcularFechaFinPago();
    this.TipoPagoChange();
  }

  TipoSepulturaFilter() {
    const tipoPlan = this.registerForm.get('cntc_icodigo_plan')?.value;
    const nombrePlan = this.registerForm.get('cntc_icod_nombre_plan')?.value;
    this.generalService.TipoSepulturaByPlan(tipoPlan, nombrePlan)
      .subscribe(res => this.tipoSepulturaCab = res)
  }

  TipoDecesoFilter(): void {

    const tipoDeceso = this.registerForm.get('cntc_icod_tipo_deceso')?.value;
    if (tipoDeceso == 3401) {
      this.registerForm.get('cntc_vobservacion')?.enable()
    }

    else {
      this.registerForm.get('cntc_vobservacion')?.disable({ onlySelf: false })
      this.registerForm.get('cntc_vobservacion')?.setValue("");

    }

  }

  ParentescoChanged(controlName: string, enableControlName: string): void {

    const idParentesco = this.registerForm.get(controlName)?.value;
    if (idParentesco == 28605) {
      this.registerForm.get(enableControlName)?.enable()
    }

    else {
      this.registerForm.get(enableControlName)?.disable({ onlySelf: false })
      this.registerForm.get(enableControlName)?.setValue("");

    }

  }

  BorrarSeleccionados() {
    this.registerForm.get('cntc_icodigo_plan')?.setValue(0);
    this.registerForm.get('cntc_icod_nombre_plan')?.setValue(0);
    this.registerForm.get('cntc_itipo_sepultura')?.setValue(0);
    this.TipoPagoChange();
    this.tipoSepulturaDet = [];
  }

  TipoPagoChange() {
    // CREDITO 674 | CONTADO 673 | DONACION 678
    const value = this.registerForm.get('cntc_itipo_pago')?.value;
    if (value == 674) {
      this.registerForm.get('cntc_inro_cuotas')?.enable()
      this.registerForm.get('cntc_ncuota_inicial')?.enable()
      this.registerForm.get('cntc_nmonto_cuota')?.enable()

      this.CustomCuota = !(this.tipoSepulturaDet.length > 0);

      const montoCuotas = parseFloat(this.registerForm.get('cntc_nmonto_cuota')?.value);
      const cuotas = parseFloat(this.registerForm.get('cntc_inro_cuotas')?.value);
      this.registerForm.get('cntc_nsaldo')?.setValue((montoCuotas * cuotas).toString());
      const saldo = parseFloat(this.registerForm.get('cntc_nsaldo')?.value);
      const cuotaIncial = parseFloat(this.registerForm.get('cntc_ncuota_inicial')?.value);

      this.registerForm.get('cntc_nprecio_total')?.setValue((saldo + cuotaIncial).toString());
    }
    if (value == 673) {
      this.registerForm.get('cntc_inro_cuotas')?.disable()
      this.registerForm.get('cntc_ncuota_inicial')?.disable()
      this.registerForm.get('cntc_nmonto_cuota')?.disable()
      this.registerForm.get('cntc_nprecio_total')?.setValue(this.registerForm.get('cntc_nprecio_lista')?.value);
      this.registerForm.get('cntc_nsaldo')?.setValue(this.registerForm.get('cntc_nprecio_lista')?.value);
    }
    if (value == 678) {

    }
  }



  CalcularFechaFinPago() {
    const fechaInicio = new Date(this.registerForm.get('cntc_sfecha_cuota')?.value);
    const cantidad = this.registerForm.get('cntc_inro_cuotas')?.value;
    if (fechaInicio && cantidad) {
      let nuevaFecha = new Date(fechaInicio.getTime());
      nuevaFecha.setMonth(nuevaFecha.getMonth() + (cantidad - 1));

      // Formatear la fecha en el formato "yyyy-MM-dd"
      const fechaFormateada = nuevaFecha.toISOString().substring(0, 10);

      // Actualizar la propiedad de fecha con la nueva fecha formateada
      this.registerForm.get('cntc_sfecha_fin_pago')?.setValue(fechaFormateada);
    }
  }


  FechaInicioPagoChanged() {
    const value = this.registerForm.get('cntc_sfecha_cuota')?.value;
    const tipoPago = this.registerForm.get('cntc_itipo_pago')?.value;
    if (tipoPago == 673) {
      this.registerForm.get('cntc_sfecha_fin_pago')?.setValue(value);
    } else {
      this.registerForm.get('cntc_sfecha_fin_pago')?.setValue('');
    }
    this.CalcularFechaFinPago();
    this.TipoPagoChange()
  }

}
