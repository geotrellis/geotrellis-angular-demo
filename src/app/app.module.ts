import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { AppComponent } from './app.component';
import { SidebarSectionComponent } from './pages/map-view/sidebar-section/sidebar-section.component';
import { SidebarHeaderComponent } from './pages/map-view/sidebar-section/sidebar-header/sidebar-header.component';
import { LayerCardComponent } from './pages/map-view/sidebar-section/layer-card/layer-card.component';

import { RejoinPipe } from './pipes/rejoin.pipe';
import { ParamItemComponent } from './pages/map-view/sidebar-section/layer-card/param-item/param-item.component';
import { MapViewComponent } from './pages/map-view/map-view.component';

import { MapWrapperDirective } from './directives/map-wrapper.directive';
import { ActionBtnDirective } from './directives/action-btn.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarSectionComponent,
    SidebarHeaderComponent,
    LayerCardComponent,
    RejoinPipe,
    ParamItemComponent,
    MapViewComponent,

    MapWrapperDirective,
    ActionBtnDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
