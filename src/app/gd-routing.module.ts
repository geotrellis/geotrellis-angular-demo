import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lm', loadChildren: './demos/lm/lm.module#LmModule', data: { name: 'lm' } },
  { path: 'chatta', loadChildren: './demos/chatta/chatta.module#ChattaModule', data: { 
    name: 'chatta' } },
  { path: 'point-cloud', loadChildren: './demos/point-cloud/point-cloud.module#PointCloudModule', data: { name: 'point-cloud' } },
  { path: 'potsdam', loadChildren: './demos/potsdam/potsdam.module#PotsdamModule', data: { name: 'potsdam' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GdRoutingModule { }
