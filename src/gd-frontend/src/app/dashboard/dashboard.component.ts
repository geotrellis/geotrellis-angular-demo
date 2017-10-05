import { Component, HostBinding, OnInit } from '@angular/core';
import { INFO } from '../demos/demos';

@Component({
  selector: 'gd-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.dashboard') true;
  demos: {
    name: string;
    title: string;
    thumb: string;
  }[] = [];

  ngOnInit() {
    this.demos = INFO;
  }
}
