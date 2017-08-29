import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.css']
})
export class OverviewCardComponent implements OnInit {
  @Input() project;
  constructor() { }
  get Categories() {
    return Object.keys(this.project.filesPercentages).map(name=>({
      name,
      styleWidth: Math.ceil(this.project.filesPercentages[name] * 100) + '%'
    }))
  }
  ngOnInit() { }
}
