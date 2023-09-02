import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { MiCuentaComponent } from './mantenimientos/mi-cuenta/mi-cuenta.component';
import { UserDialogComponent } from './mantenimientos/usuarios/dialog/user-dialog/user-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRippleModule} from '@angular/material/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RegistroDeContratosComponent } from './operaciones/registro-de-contratos/registro-de-contratos.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,    
    UsuariosComponent,
    MiCuentaComponent,
    UserDialogComponent,
    RegistroDeContratosComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MomentDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    NgChartsModule,
    MatTabsModule,
    MatRippleModule,
    TableModule,
    ButtonModule
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
      
    //AccountSettingsComponent,
  ]
})
export class PagesModule { }
