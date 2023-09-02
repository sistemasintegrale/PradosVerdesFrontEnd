export interface UsuarioData {
  usua_icod_usuario: number;
  usua_codigo_usuario: string | null;
  usua_nombre_usuario: string | null;
  usua_password_usuario: string | null;
  usua_iusuario_crea: number | null;
  usua_sfecha_crea: string | null;
  usua_iusuario_modifica: number | null;
  usua__sfecha_modifica: string | null;
  usua_iactivo: boolean | null;
  usua_flag_estado: boolean | null;
  usua_indicador_asesor: boolean | null;
  vendc_icod_vendedor: number | null;
  usua_bweb: boolean | null;
}