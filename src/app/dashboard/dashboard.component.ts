import { Component, OnInit } from '@angular/core';
import { DataService }       from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {
  connection;
  repos: any[] = [];

  constructor(private dataService:DataService) {}

  ngOnInit() {
    this.connection = this.dataService.getProjectsObserver().subscribe((repos: any[]) => {
      this.repos = repos;
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
