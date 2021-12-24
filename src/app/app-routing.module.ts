import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpCenterComponent } from './component/admin/emp-center/emp-center.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full' },
  { path: 'admin/empcenter', component: EmpCenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
