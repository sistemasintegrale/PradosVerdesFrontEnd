import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from 'src/app/services/main/dashboard.service';
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

  
  constructor(

  ) { }

  ngOnInit(): void {

  
  }

 
}
