import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AuthGuard } from '../guards/auth.guard';
import { MiCuentaComponent } from './mantenimientos/mi-cuenta/mi-cuenta.component';
import { RegistroDeContratosComponent } from './operaciones/registro-de-contratos/registro-de-contratos.component';

const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Main', subTitulo: 'Dashboard' } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'operaciones',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'registro-contratos', component: RegistroDeContratosComponent, data: { titulo: 'Operaciones', subTitulo: 'Registro de Contratos' } },
    ]
  },
  {
    path: 'mantenimientos',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimientos', subTitulo: 'Usuarios' } },
      { path: 'mi-perfil', component: MiCuentaComponent, data: { titulo: 'Mantenimientos', subTitulo: 'Mi Perfil' } },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRountingModule {

}
