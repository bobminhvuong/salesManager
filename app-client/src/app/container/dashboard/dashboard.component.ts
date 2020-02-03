import { ReportService } from './../../service/report/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = true;
  dataReport : any;
  constructor() { }

  ngOnInit() {
  }
}
