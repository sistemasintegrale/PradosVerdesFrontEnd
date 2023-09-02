import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  public verPassword: boolean = false;
  public titulo = '';
  public formSubmitted = false;
  public registerForm!: FormGroup;
  public admin!: boolean;
  public estados = [{ value: true, descripcion: 'Activo' }, { value: false, descripcion: 'Inactivo' }]

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    public usuarioService: UsuarioService,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioData
  ) {
    if (this.usuario !== null) {
      this.titulo = 'Modificar usuario ' + this.usuario.usua_nombre_usuario;
    } else {
      this.titulo = 'Nuevo usuario';

    }

    console.log(this.usuario)
  }
    ngOnInit() {

    this.registerForm = new FormGroup({
      nombre: new FormControl(this.usuario ? this.usuario.usua_nombre_usuario : '', [Validators.required]),
      codigo: new FormControl(this.usuario ? this.usuario.usua_codigo_usuario : '', [Validators.required]),
      password: new FormControl(this.usuario ? this.usuario.usua_password_usuario : '', [Validators.required]),
      estado: new FormControl(this.usuario ? this.usuario.usua_iactivo : true, [Validators.required]),   
      web: new FormControl(this.usuario ? this.usuario.usua_bweb : true, [Validators.required]),    
    });     
  }
  close() {
    this.dialogRef.close();
  }

  addUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;     
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: ((data) => {
          if (data.isSucces) {
            this.dialogRef.close(true);
            Swal.fire(
              'Usuario Creado',
              `Usuario ${data.data.usua_nombre_usuario} fué creado correctamente`,
              'success'
            );
          }
        })
      }
      );
  }

  editUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
    this.usuarioService
      .modificarUsuario(this.registerForm.value, this.usuario.usua_icod_usuario)
      .subscribe({
        next: ((data) => {
          if (data.isSucces) {
            this.dialogRef.close(true);
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

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }
  cambiarTipo(valor: boolean) {
    let elemento: any = document.getElementById('contraseña');
    this.verPassword = valor;
    if (valor) {
      elemento.type = "text";
    } else {
      elemento.type = "password";
    }
  }
}
