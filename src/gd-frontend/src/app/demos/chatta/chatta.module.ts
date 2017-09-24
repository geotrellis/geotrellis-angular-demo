import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ChattaViewComponent } from './chatta-view.component';

import { SharedModule } from '../../shared/shared.module';
import { ChattaDemoService } from './chatta-demo.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ChattaViewComponent },
    ])
  ],
  declarations: [ ChattaViewComponent ],
  providers: [ ChattaDemoService ]
})

export class ChattaModule { }
