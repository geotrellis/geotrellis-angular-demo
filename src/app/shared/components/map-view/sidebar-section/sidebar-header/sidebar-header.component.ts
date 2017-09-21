import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gd-sidebar-header',
  templateUrl: './sidebar-header.component.html'
})
export class SidebarHeaderComponent {
  @HostBinding('class.-collapsed') @Input() isCollapsed = false;
  @Output() isCollapsedChange = new EventEmitter<boolean>();
  @Input() title: string;

  goBack() {
    this.router.navigateByUrl('/dashboard');
  }

  constructor(
    private router: Router,
  ) { }
}
