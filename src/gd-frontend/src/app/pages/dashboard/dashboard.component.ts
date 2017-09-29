import { Component, HostBinding, OnInit } from '@angular/core';
import { DemoService } from '../../shared/services/demo.service';
import { LayerCard } from '../../shared/models/layer-card.d';
import { Demo } from '../../shared/models/demo.d';

@Component({
  selector: 'gd-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.dashboard') true;
  cards: {
    name: string;
    title: string;
    thumb: string;
  }[] = [];
  demos: {
    name: string;
    title: string;
    thumb: string;
  }[] = [];

  constructor(
    private demoService: DemoService
  ) { }

  ngOnInit() {
    this.demoService.getDemosInfo().then(demosInfo => {
      this.demos = demosInfo;
    });
  }
}
