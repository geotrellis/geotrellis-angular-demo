import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ChattaService } from './chatta.service';
import { ChattaComponent } from './chatta.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ChattaComponent },
    ])
  ],
  declarations: [ ChattaComponent ],
  providers: [ ChattaService ]
})

export class ChattaModule { }
