import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioData } from 'src/app/models/usuario/usuario-data';
import { SideBarService } from 'src/app/services/shared/side-bar.service';
import { UsuarioService } from 'src/app/services/mantenimientos/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public usuario!: UsuarioData;
  public menuItems !: any[];
  constructor(private sideBarService: SideBarService,
    private usuarioService: AuthService,
    private router: Router) {
    this.menuItems = sideBarService.menu;
    this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {

  }



  logout() {
    this.usuarioService.logOut();
    this.router.navigateByUrl('/login')
  }
}