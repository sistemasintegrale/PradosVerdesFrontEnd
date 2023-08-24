import { Injectable } from '@angular/core';
import { Menu } from 'src/app/models/menu';
import { AuthService } from '../auth/auth.service';
import { SubMenu } from 'src/app/models/sub-menu';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  public sideMenu: Menu[] = [];

  subMenuUsuarios: SubMenu = {
    titulo: 'Usuarios',
    url: 'usuarios',
    icono: 'fas fa-users',
    color: 'text-cyan-500'
  };
  subMenuMiPerfil: SubMenu = {
    titulo: 'Mi Perfil',
    url: 'mi-perfil',
    icono: 'fas fa-user',
    color: 'text-red-500'
  };

  subMenuHistorialAutos: SubMenu = {
    titulo: 'Historial Autos',
    url: 'reporte-historial-autos',
    icono: 'ni ni-single-copy-04',
    color: 'text-orange-500'
  }

  subMenuHistorialMotos: SubMenu = {
    titulo: 'Historial Motos',
    url: 'reporte-historial-motos',
    icono: 'ni ni-collection',
    color: 'text-emerald-500'
  }

  SubMenuMain: SubMenu = {
    titulo: 'Dashboard',
    url: '/dashboard',
    icono: 'ni ni-tv-2',
    color: 'text-blue-500'
  }


  constructor(private authService: AuthService) {
     const menuDashboard : Menu ={
      titulo:"Main",
      submenu :[this.SubMenuMain]
     }

     const subMenusHistorial : SubMenu[] = [];
    
      subMenusHistorial.push(this.subMenuHistorialAutos)
    
    
      subMenusHistorial.push(this.subMenuHistorialMotos)
 

     const menuReportes : Menu = {
      titulo : 'Reportes',
      submenu : subMenusHistorial
     }

     const subMenuMantenimientos : SubMenu[]=[];
      subMenuMantenimientos.push(this.subMenuUsuarios);
     
     subMenuMantenimientos.push(this.subMenuMiPerfil);

     const menuMantenimientos : Menu = {
      titulo : 'Mantenimientos',
      submenu : subMenuMantenimientos
     }

     this.sideMenu.push(menuDashboard,menuReportes,menuMantenimientos)
  }

}
