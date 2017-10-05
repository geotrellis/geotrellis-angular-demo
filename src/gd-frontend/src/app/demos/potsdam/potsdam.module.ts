import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { PotsdamService } from './potsdam.service';
import { PotsdamComponent } from './potsdam.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: PotsdamComponent },
    ])
  ],
  declarations: [ PotsdamComponent ],
  providers: [ PotsdamService ]
})

export class PotsdamModule { }
