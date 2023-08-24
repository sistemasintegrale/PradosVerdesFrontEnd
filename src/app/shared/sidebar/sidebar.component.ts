import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { SideBarService } from 'src/app/services/shared/side-bar.service';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Menu } from 'src/app/models/menu';
import { SubMenu } from 'src/app/models/sub-menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public usuario!: UsuarioData;
  public menuItems !: any[];
  public sideMenu: Menu[] = [];

  subMenuUsuarios: SubMenu = {
    titulo: 'Usuarios',
    url: '/mantenimientos/usuarios',
    icono: 'fas fa-users',
    color: 'text-cyan-500'
  };
  subMenuMiPerfil: SubMenu = {
    titulo: 'Mi Perfil',
    url: '/mantenimientos/mi-perfil',
    icono: 'fas fa-user',
    color: 'text-red-500'
  };

   

  subMenuRegistroContratos: SubMenu = {
    titulo: 'Registro de Contratos',
    url: '/operaciones/registro-contratos',
    icono: 'ni ni-collection',
    color: 'text-emerald-500'
  }

  SubMenuMain: SubMenu = {
    titulo: 'Dashboard',
    url: '/main/dashboard',
    icono: 'ni ni-tv-2',
    color: 'text-blue-500'
  }

  constructor(private sideBarService: SideBarService,
    private authService: AuthService,
    private router: Router) {
    const menuDashboard: Menu = {
      titulo: "Main",
      submenu: [this.SubMenuMain]
    }
   
    const menuOperaciones : Menu ={
      titulo : 'Operaciones',
      submenu : [this.subMenuRegistroContratos]
    }

    const subMenuMantenimientos: SubMenu[] = [];
    
      subMenuMantenimientos.push(this.subMenuUsuarios);

    subMenuMantenimientos.push(this.subMenuMiPerfil);

    const menuMantenimientos: Menu = {
      titulo: 'Mantenimientos',
      submenu: subMenuMantenimientos
    }

    this.sideMenu.push(menuDashboard, menuOperaciones, menuMantenimientos)



  }
  ngOnInit(): void {

  }



  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login')
  }
}
