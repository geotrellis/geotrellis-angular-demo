import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'lm', loadChildren: './demos/lm/lm.module#LmModule' },
  { path: 'chatta', loadChildren: './demos/chatta/chatta.module#ChattaModule' },
  { path: 'point-cloud', loadChildren: './demos/point-cloud/point-cloud.module#PointCloudModule' },
  { path: 'potsdam', loadChildren: './demos/potsdam/potsdam.module#PotsdamModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
