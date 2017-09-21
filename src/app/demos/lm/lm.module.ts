import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LmViewComponent } from './lm-view.component';

import { SharedModule } from '../../shared/shared.module';
import { LmDemoService } from './lm-demo.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LmViewComponent },
    ])
  ],
  declarations: [LmViewComponent],
  providers: [LmDemoService]
})
export class LmModule { }
