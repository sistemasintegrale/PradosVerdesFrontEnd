import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioFilters } from 'src/app/interfaces/usuario/filters';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import Swal from 'sweetalert2';
import { UserDialogComponent } from './dialog/user-dialog/user-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  public totalUsuarios: number = 0;
  public usuarios: UsuarioData[] = [];
  public desde: number = 0;
  public cargando = true;
  public filters = {} as UsuarioFilters;
  public nombre: string = '';
  public cantidadRegistros: number = 10;
  public selectedUser! : UsuarioData;
  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    public authService: AuthService,
  ) { }
   ngOnInit() {
    this.cargarUsuarios();    
  } 


  cargarUsuarios() {
    this.usuarioService.cargarUsuarios()
      .subscribe(resp => {
        
        this.usuarios = resp.data
        this.cargando = false;
      });
  }

  openAdd() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios();
      }
    })
  }

  openEdit(usuario: UsuarioData) {
    this.usuarioService.getUsuario(usuario.usua_icod_usuario)
      .subscribe({
        next: ((data) => {          
          this.dialog.open(UserDialogComponent, {
            disableClose: false,
            width: '400px',
            data: data
          }).afterClosed().subscribe(result => {
            if (result) {
              this.cargarUsuarios();
            }
          });
        })
      });
  }

  eliminarUsuario(usuario: UsuarioData) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta apunto de borrar a ${usuario.usua_nombre_usuario}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            Swal.fire(
              'Usuario borrado',
              `${usuario.usua_nombre_usuario} fué borrado correctamente`,
              'success'
            );
            this.cargarUsuarios();
          }
          );
      }
    })
  }
}
