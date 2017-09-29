import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';

import { GdComponent } from './gd.component';
import { GdRoutingModule } from './gd-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    // HttpClientModule,
    GdRoutingModule,
  ],
  declarations: [
    GdComponent
  ],
  bootstrap: [GdComponent]
})
export class GdModule { }
