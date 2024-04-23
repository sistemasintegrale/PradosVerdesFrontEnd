export interface Cuota {
  cntc_icod_contrato_cuotas: number | null;
  cntc_icod_contrato: number | null;
  cntc_inro_cuotas: number | null;
  cntc_sfecha_cuota: string | null;
  cntc_icod_tipo_cuota: number;
  cntc_nmonto_cuota: number | null;
  cntc_icod_situacion: number | null;
  cntc_flag_situacion: boolean | null;
  tdocc_icod_tipo_doc: number | null;
  cntc_itipo_cuota: number | null;
  cntc_nsaldo: number | null;
  cntc_npagado: number | null;
  cntc_nmonto_mora_pago: number | null;
  cntc_nmonto_mora: number | null;
  cntc_sfecha_pago_cuota: string | null;
  cntc_iusuario_crea: number | null;
  cntc_vpc_crea: string | null;
}
