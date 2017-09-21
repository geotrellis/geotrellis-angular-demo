import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { PointCloudViewComponent } from './point-cloud-view.component';

import { SharedModule } from '../../shared/shared.module';
import { PointCloudDemoService } from './point-cloud-demo.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: PointCloudViewComponent },
    ])
  ],
  declarations: [PointCloudViewComponent],
  providers: [PointCloudDemoService]
})

export class PointCloudModule { }
