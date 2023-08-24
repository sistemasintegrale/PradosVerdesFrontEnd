export class UsuarioData {
  constructor(
     public  token :string,
        public  usua_icod_usuario: number,
        public  usua_codigo_usuario :string,
        public  usua_nombre_usuario :string,
        public  usua_password_usuario :string,
        public  usua_iusuario_crea :number,
        public  usua_sfecha_crea :Date,
        public  usua_iusuario_modifica :number,
        public  usua__sfecha_modifica :Date,
        public  usua_iactivo :boolean,
        public  usua_flag_estado :boolean,
        public  usua_indicador_asesor :boolean,
        public  vendc_icod_vendedor :number
  ) { };


}
