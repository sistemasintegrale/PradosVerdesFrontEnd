import { RegisterForm } from 'src/app/interfaces/usuario/register-form';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html'
})
export class MiCuentaComponent implements OnInit {
  public usuario!: UsuarioData;
  public verPassword: boolean = false;
  public titulo = '';
  public formSubmitted = false;
  public estados = [
    { value: true, descripcion: 'Activo' }, { value: false, descripcion: 'Inactivo' }
  ]
  constructor(private authservice: AuthService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.usuario = this.authservice.usuario;
    this.usuarioService.getUsuario(this.authservice.usuario.usua_icod_usuario)
      .subscribe({
        next: (data => {
          this.usuario = data.data;
          this.cargar()
        })
      });
  }
    cargar() {
 

    this.registerForm = new FormGroup({
      nombre: new FormControl(this.usuario ? this.usuario.usua_nombre_usuario : '', [Validators.required]),
      codigo: new FormControl(this.usuario ? this.usuario.usua_codigo_usuario : '', [Validators.required]),    
      password: new FormControl(this.usuario ? this.usuario.usua_password_usuario : '', [Validators.required]),
      estado: new FormControl(this.usuario ? this.usuario.usua_iactivo : true, [Validators.required])
    });
  }
  registerForm = new FormGroup({
    nombre: new FormControl(this.usuario ? this.usuario.usua_nombre_usuario : '', [Validators.required]),
    codigo: new FormControl(this.usuario ? this.usuario.usua_codigo_usuario : '', [Validators.required]),    
    password: new FormControl(this.usuario ? this.usuario.usua_password_usuario : '', [Validators.required]),
    estado: new FormControl(this.usuario ? this.usuario.usua_iactivo : true, [Validators.required])
  });


  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }
   

  openChangePassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      disableClose: false, 
      data: this.usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.update) {
        const data: RegisterForm = {
          nombre: this.registerForm.controls.nombre.value!,
          codigo: this.registerForm.controls.codigo.value!,         
          password: result.newPasss,
          password2: result.newPasss,
          estado: this.registerForm.controls.estado.value!
        }
    
        this.usuarioService
          .modificarUsuario(data, this.usuario.usua_icod_usuario)
          .subscribe({
            next: ((data) => {
              this.usuarioService.getUsuario(this.authservice.usuario.usua_icod_usuario)
                .subscribe({
                  next: (data => {
                    this.usuario = data.data;
                    this.cargar()
                  })
                });
              if (data.isSucces) {
                Swal.fire(
                  'Usuario modificado',
                  `Usuario ${data.data.usua_nombre_usuario} fué modificado correctamente`,
                  'success'
                );
              }
            })
          }
          );
      }
    })
  }

  editUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;

    const data: RegisterForm = {
      nombre: this.registerForm.controls.nombre.value!,
      codigo: this.registerForm.controls.codigo.value!,
      password: this.registerForm.controls.password.value!,
      password2: this.registerForm.controls.password.value!,
      estado: this.registerForm.controls.estado.value!
    }

    this.usuarioService
      .modificarUsuario(data, this.usuario.usua_icod_usuario)
      .subscribe({
        next: ((data) => {
          this.usuarioService.getUsuario(this.authservice.usuario.usua_icod_usuario)
            .subscribe({
              next: (data => {
                this.usuario = data.data;
                this.cargar()
              })
            });
          if (data.isSucces) {
            Swal.fire(
              'Usuario modificado',
              `Usuario ${data.data.usua_nombre_usuario} fué modificado correctamente`,
              'success'
            );
          }
        })
      }
      );
  }
}
