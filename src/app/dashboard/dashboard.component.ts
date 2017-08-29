import { Component, OnInit } from '@angular/core';
import { filter } from 'lodash';

import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {
  connection;
  projects: any[] = [];
  loaded: boolean = false;

  constructor(private dataService: DataService) { }

  get OtherProjects(): any[] {
    return filter(this.projects, { isNpm: false });
  }
  get NpmProjects(): any[] {
    return filter(this.projects, { isNpm: true });
  }

  ngOnInit() {
    this.connection = this.dataService.getProjectsObserver().subscribe((repos: any[]) => {
      this.projects = repos;
      console.log(this.NpmProjects);
      this.loaded = true;
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
