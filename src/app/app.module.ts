import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VfChatWidgetModule } from 'vf-chat-widget';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IntegrationComponent } from './integration/integration.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthorizationService } from './authorization.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatDatePipe } from './pipes/chat-date.pipe';
import { SessionsPipe } from './pipes/sessions.pipe';
import { OrderbyDatePipe } from './pipes/orderby-date.pipe';
import { DatePipe } from '@angular/common';
import { ReversePipe } from './pipes/reverse.pipe';
import { SearchFilterPipe } from './pipes/seach-filter.pipe';
import { GenerateComponent } from './generate/generate.component';
import { RunComponent } from './run/run.component';
import { ScriptsComponent } from './scripts/scripts.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      {
        path: 'generate',
        canActivate: [AuthGuardService],
        component: GenerateComponent,
      },
      {
        path: 'run',
        canActivate: [AuthGuardService],
        component: RunComponent,
      },
      {
        path: 'scripts',
        canActivate: [AuthGuardService],
        component: ScriptsComponent,
      },
      {
        path: 'integration',
        canActivate: [AuthGuardService],
        component: IntegrationComponent,
      },
      {
        path: 'profile',
        canActivate: [AuthGuardService],
        component: ProfileComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    IntegrationComponent,
    ProfileComponent,
    GenerateComponent,
    RunComponent,
    ScriptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatStepperModule,
    ClipboardModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    VfChatWidgetModule,
    ScrollingModule,
  ],
  exports: [RouterModule],
  providers: [
    DatePipe,
    AuthGuardService,
    AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
