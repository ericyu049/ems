import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmployeeCenterComponent } from './component/emp-center/emp-center.component';
import { JiraComponent } from './component/jira/jira.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from './service/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'empcenter', component: EmployeeCenterComponent, canActivate: [AuthGuardService] },
  { path: 'jira', component: JiraComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
