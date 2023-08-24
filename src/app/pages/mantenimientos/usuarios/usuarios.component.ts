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
  cambiarPagina(valor: number) {
    const valorAnterior = this.desde;
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    if (valorAnterior !== this.desde) {
      this.cargarUsuarios();
    }

  }

  getPaginationData(event: PageEvent): PageEvent {

    return event;
  }

  buscar(termino: string) {
    this.desde = 0;
    this.nombre = termino;
    this.cargarUsuarios();
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
    if (usuario.usua_icod_usuario === 1 && this.authService.usuario.usua_icod_usuario != 1)
      return;

    this.usuarioService.getUsuario(usuario.usua_icod_usuario)
      .subscribe({
        next: ((data) => {
          usuario.usua_password_usuario = data.data.usua_password_usuario
          this.dialog.open(UserDialogComponent, {
            disableClose: false,
            width: '400px',
            data: usuario
          }).afterClosed().subscribe(result => {
            if (result) {
              this.cargarUsuarios();
            }
          });
        })
      });
  }

  eliminarUsuario(usuario: UsuarioData) {
    if (usuario.usua_icod_usuario === 1 && this.authService.usuario.usua_icod_usuario != 1)
      return;
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
