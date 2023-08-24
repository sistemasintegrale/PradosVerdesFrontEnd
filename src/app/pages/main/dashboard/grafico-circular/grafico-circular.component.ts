import { ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { Component } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
@Component({
  selector: 'app-grafico-circular',
  templateUrl: './grafico-circular.component.html',
  styleUrls: []
})
export class GraficoCircularComponent {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'pie';
  public barChartLegend = true;

  public barChartData: ChartDataset[] = [

  ];

  constructor(
    private dasboardService: DashboardDataService,
  ) { }
  ngOnInit(): void {
    this.dasboardService.Data.subscribe(
      res => {
        this.barChartLabels = [];
        this.barChartData = [];
        this.barChartLabels = (res.Labels);
        this.barChartData.push({ data: res.MontoSol, label: 'Facturado S/' });
        this.barChartData.push({ data: res.MontoDol, label: 'Facturado US/' })
      }
    )
  }
}
