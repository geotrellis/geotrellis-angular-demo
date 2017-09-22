import { Component, Input, OnChanges, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'gd-info-panel',
  templateUrl: './info-panel.component.html',
})
export class InfoPanelComponent implements OnChanges {

  @Input() data: {
    infoText: string;
    palettes?: string[];
    palette?: string;
  };

  @Input() expanded: string;

  @Output() paletteChange = new EventEmitter<string>();
  showMenu = false;
  @HostBinding('class.action-panel') bool = true;

  @HostBinding('class.-expanded') isExpanded = this.expanded === 'info' ? true : false;

  ngOnChanges(changes) {
    console.log(changes);
  }
}
