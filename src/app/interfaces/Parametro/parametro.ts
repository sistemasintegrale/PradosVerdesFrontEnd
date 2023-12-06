export interface Parametro {
    rgpmc_icod_registro_parametro: number;
    rgpmc_vcod_registro_parametro: number | null;
    rgpmc_vdescripcion: string;
    tabl_iid_situacion: number | null;
    rgpmc_vserie_factura: string;
    rgpmc_icorrelativo_factura: number | null;
    rgpmc_vserie_boleta: string;
    rgpmc_icorrelativo_boleta: number | null;
    rgpmc_vserieF_nota_credito: string;
    rgpmc_icorrelativo_nota_credito: number | null;
    rgpmc_vserieF_nota_debito: string;
    rgpmc_icorrelativo_nota_debito: number | null;
    rgpmc_vserieB_nota_credito: string;
    rgpmc_vserieB_nota_debito: string;
    rgpmc_vserie_recibo_caja: string;
    rgpmc_icorrelativo_recibo_caja: number | null;
    rgpmc_vserie_contrato: string;
    rgpmc_icorrelativo_contrato: number | null;
    rgpmc_icorrelativo_solicitud: number | null;
}