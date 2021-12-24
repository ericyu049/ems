import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddReviewComponent } from './component/admin/add-review/add-review.component';
import { EmpCenterComponent } from './component/admin/emp-center/emp-center.component';
import { EmpProfileComponent } from './component/admin/emp-profile/emp-profile.component';
import { NewEmployeeComponent } from './component/admin/new-employee/new-employee.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { ReviewComponent } from './component/review/review.component';
import { MaterialModule } from './material.module';
import { AppService } from './service/app.service';
import { AppEffects } from './store/app.effect';
import { AppReducer } from './store/app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    EmpCenterComponent,
    EmpProfileComponent,
    LoginComponent,
    DashboardComponent,
    ReviewComponent,
    NewEmployeeComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ 'ems': AppReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Doc-View DevTools',
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [
    { provide: AppService, useClass: AppService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
