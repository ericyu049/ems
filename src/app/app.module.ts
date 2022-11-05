import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavComponent } from './component/top-nav/top-nav.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeCenterComponent } from './component/emp-center/emp-center.component';
import { AppService } from './service/app.service';
import { EmployeeComponent } from './component/employee/employee.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteMessageComponent } from './component/delete-message/delete-message.component';
import { AddReviewComponent } from './component/add-review/add-review.component';
import { ReviewComponent } from './component/review/review.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { StatusPipe } from './pipe/status.pipe';
import { JiraComponent } from './component/jira/jira.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ActiveSprintsComponent } from './component/active-sprints/active-sprints.component';
import { StoryComponent } from './component/story/story.component';
import { AddStoryComponent } from './component/add-story/add-story.component';
import { AddSprintComponent } from './component/add-sprint/add-sprint.component';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { PriorityPipe } from './pipe/priority.pipe';
import { BacklogComponent } from './component/backlog/backlog.component';
import { ProjectDetailComponent } from './component/project-detail/project-detail.component';
import { ProjectSettingComponent } from './component/project-setting/project-setting.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/authguard.service';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    TopNavComponent,
    EmployeeCenterComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    DeleteMessageComponent,
    AddReviewComponent,
    ReviewComponent,
    FeedbackComponent,
    JiraComponent,
    DashboardComponent,
    ActiveSprintsComponent,
    StoryComponent,
    AddStoryComponent,
    AddSprintComponent,
    BacklogComponent,
    ProjectDetailComponent,
    ProjectSettingComponent,
    StatusPipe,
    PriorityPipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [
    AppService,
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
