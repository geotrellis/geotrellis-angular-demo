import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { PointCloudService } from './point-cloud.service';
import { PointCloudComponent } from './point-cloud.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: PointCloudComponent },
    ])
  ],
  declarations: [ PointCloudComponent ],
  providers: [ PointCloudService ]
})

export class PointCloudModule { }
