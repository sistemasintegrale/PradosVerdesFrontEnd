import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { BaseResponse } from 'src/app/interfaces/comon/base-response';
import { LoginForm } from 'src/app/interfaces/usuario/login-form';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { environment } from 'src/environments/environments';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public usuario!: UsuarioData;

  getToken() {
    return localStorage.getItem('token');
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/Usuarios/validarToken`)
      .pipe(
        tap((resp: any) => {
          if (resp.isSucces) {
            this.usuario = resp.data;
            localStorage.setItem('token', resp.data.token);
          }
        }),
        map(resp => true),
        catchError(error => of(false))
      );
  }

  logOut() {
    localStorage.removeItem('token');
  }

  login(formData: LoginForm): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${base_url}/Usuarios/generate/token`, formData)
      .pipe(
        tap((resp) => {
          if (resp.isSucces) {

            localStorage.setItem('token', resp.data);
          }
        }));
  }
}
