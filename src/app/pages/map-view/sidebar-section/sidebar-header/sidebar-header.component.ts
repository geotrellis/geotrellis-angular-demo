import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'gd-sidebar-header',
  templateUrl: './sidebar-header.component.html'
})
export class SidebarHeaderComponent {
  @HostBinding('class.-collapsed') @Input() isCollapsed = false;
  @Output() isCollapsedChange = new EventEmitter<boolean>();
  @Input() title: string;

  goBack() {
    this.location.back();
  }

  constructor(
    private location: Location
  ) { }
}
