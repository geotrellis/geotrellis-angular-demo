import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { CardService } from './services/card.service';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapViewComponent } from './pages/map-view/map-view.component';

import { SidebarSectionComponent } from './pages/map-view/sidebar-section/sidebar-section.component';
import { SidebarHeaderComponent } from './pages/map-view/sidebar-section/sidebar-header/sidebar-header.component';
import { LayerCardComponent } from './pages/map-view/sidebar-section/layer-card/layer-card.component';
import { ParamItemComponent } from './pages/map-view/sidebar-section/layer-card/param-item/param-item.component';

import { RejoinPipe } from './pipes/rejoin.pipe';

import { MapWrapperDirective } from './directives/map-wrapper.directive';
import { ActionBtnDirective } from './directives/action-btn.directive';

import { GdRoutingModule } from './gd-routing.module';

@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    MapViewComponent,

    SidebarSectionComponent,
    SidebarHeaderComponent,
    LayerCardComponent,
    ParamItemComponent,

    RejoinPipe,

    MapWrapperDirective,
    ActionBtnDirective,
  ],
  imports: [
    GdRoutingModule,
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [ CardService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
