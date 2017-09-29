import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { LmService } from './lm.service';
import { LmComponent } from './lm.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LmComponent },
    ])
  ],
  declarations: [ LmComponent ],
  providers: [ LmService ]
})
export class LmModule { }
