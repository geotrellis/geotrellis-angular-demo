import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
@Component({
    selector: 'gd-sidebar-header',
    templateUrl: './sidebar-header.component.html'
})
export class SidebarHeaderComponent {
    @HostBinding('class.-collapsed') @Input() isCollapsed = false;
    @Output() isCollapsedChange = new EventEmitter<boolean>();

    resizeSidebar(): void {
        this.isCollapsedChange.emit(!this.isCollapsed);
    }

    goBack() {
        this.location.back();
    }
    constructor(
        private location: Location
    ) { }

}
