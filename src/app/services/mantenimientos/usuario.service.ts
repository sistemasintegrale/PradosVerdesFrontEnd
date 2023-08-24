import { Injectable } from '@angular/core';
import { UsuarioData } from '../../models/usuario/usuario-data';
import { HttpClient } from '@angular/common/http';
import { UsuarioFilters } from 'src/app/interfaces/usuario/filters';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/interfaces/comon/pagination-response';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { RegisterForm } from 'src/app/interfaces/usuario/register-form';
import { UsuarioCreate } from 'src/app/models/usuario/usuario.create';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  cargarUsuarios(): Observable<BaseResponse<UsuarioData[]>> {
    return this.http.get<BaseResponse<UsuarioData[]>>(`${base_url}/Usuarios`);
  }

  crearUsuario(formData: RegisterForm): Observable<BaseResponse<UsuarioData>> {

    return this.http.post<BaseResponse<UsuarioData>>(`${base_url}/Usuarios`, formData);
  }

  getUsuario(id: number): Observable<BaseResponse<UsuarioData>> {
    return this.http.get<BaseResponse<UsuarioData>>(`${base_url}/Usuarios/${id}`);
  }

  modificarUsuario(formData: RegisterForm, id: number): Observable<BaseResponse<UsuarioData>> {
    debugger
    //const { nombre, apellidos, email, password, estado,codigoClienteNG,codigoClienteNM ,admin} = formData;
    //const valueEstado = String(estado) === 'true' ? 1 : 0;
    //const usuarioEdit = new UsuarioCreate(nombre, apellidos, email, password, Boolean(valueEstado),codigoClienteNG,codigoClienteNM,admin);
    return this.http.put<BaseResponse<UsuarioData>>(`${base_url}/Usuarios/${id}`, formData);
  }
  eliminarUsuario(usuario: UsuarioData): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/Usuarios/${usuario.usua_icod_usuario}`);
  }
}
