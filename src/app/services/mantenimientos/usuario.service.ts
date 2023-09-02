import { Injectable } from '@angular/core';
import { UsuarioData } from '../../models/usuario/usuario-data';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { RegisterForm } from 'src/app/interfaces/usuario/register-form';
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

  getUsuario(id: number): Observable<UsuarioData> {
    return this.http.get<BaseResponse<UsuarioData>>(`${base_url}/Usuarios/${id}`).pipe(map(res => res.data));
  }

  modificarUsuario(formData: RegisterForm, id: number): Observable<BaseResponse<UsuarioData>> {
    return this.http.put<BaseResponse<UsuarioData>>(`${base_url}/Usuarios/${id}`, formData);
  }
  eliminarUsuario(usuario: UsuarioData): Observable<boolean> {
    return this.http.delete<boolean>(`${base_url}/Usuarios/${usuario.usua_icod_usuario}`);
  }
}
