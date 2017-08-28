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

  constructor(private dataService:DataService) {}

  ngOnInit() {
    this.connection = this.dataService.getProjectsObserver().subscribe(message => {
      console.log('data', message);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
