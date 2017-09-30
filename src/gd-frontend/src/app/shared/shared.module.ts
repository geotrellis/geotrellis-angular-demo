import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapViewComponent } from './components/map-view/map-view.component';
import { SidebarSectionComponent } from './components/map-view/sidebar-section/sidebar-section.component';
import { SidebarHeaderComponent } from './components/map-view/sidebar-section/sidebar-header/sidebar-header.component';
import { LayerCardComponent } from './components/map-view/sidebar-section/layer-card/layer-card.component';
import { ParamItemComponent } from './components/map-view/sidebar-section/layer-card/param-item/param-item.component';
import { RejoinPipe } from './pipes/rejoin.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { MapWrapperDirective } from './directives/map-wrapper.directive';
import { ActionBtnDirective } from './directives/action-btn.directive';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
  ],
  declarations: [
    MapViewComponent,
    SidebarSectionComponent,
    SidebarHeaderComponent,
    LayerCardComponent,
    ParamItemComponent,
    RejoinPipe,
    KeysPipe,
    MapWrapperDirective,
    ActionBtnDirective
  ],
  exports: [
    MapViewComponent
  ],
  bootstrap: [
    MapViewComponent
  ]
})
export class SharedModule { }
