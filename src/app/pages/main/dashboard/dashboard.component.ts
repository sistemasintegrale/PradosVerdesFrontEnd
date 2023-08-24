import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from './dashboard-data.service';
import { environment } from 'src/environments/environments';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DasboardData } from 'src/app/interfaces/dashboard/dashboard-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  service = "1"
  dashboardData: DasboardData = { Labels: [], MontoDol: [], MontoSol: [] };
  constructor(
    public dasboardData: DashboardDataService,
    public authService: AuthService
  ) { }
  titulo: string = 'Dashboard Autos';
  ngOnInit(): void {
  }

  cambiar(){
    
    
  }
}
