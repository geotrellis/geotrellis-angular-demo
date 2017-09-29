import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { PotsdamViewComponent } from './potsdam-view.component';

import { SharedModule } from '../../shared/shared.module';
import { PotsdamDemoService } from './potsdam-demo.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: PotsdamViewComponent },
    ])
  ],
  declarations: [ PotsdamViewComponent ],
  providers: [ PotsdamDemoService ]
})

export class PotsdamModule { }
