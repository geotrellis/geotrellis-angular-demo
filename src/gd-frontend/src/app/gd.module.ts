import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GdComponent } from './gd.component';
import { GdRoutingModule } from './gd-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    GdRoutingModule,
  ],
  declarations: [
    GdComponent
  ],
  bootstrap: [GdComponent]
})
export class GdModule { }
