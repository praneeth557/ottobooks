import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VfChatWidgetModule } from 'vf-chat-widget';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ConfigureComponent } from './configure/configure.component';
import { InboxComponent } from './inbox/inbox.component';
import { SessionsComponent } from './sessions/sessions.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { IntegrationComponent } from './integration/integration.component';
import { BillingComponent } from './billing/billing.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthorizationService } from './authorization.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { SavedQuestionnaireComponent } from './saved-questionnaire/saved-questionnaire.component';
import { ChatDatePipe } from './pipes/chat-date.pipe';
import { EmptyComponent } from './empty/empty.component';
import { ProductsComponent } from './products/products.component';
import { SessionsPipe } from './pipes/sessions.pipe';
import { OrderbyDatePipe } from './pipes/orderby-date.pipe';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuardService ], component: MainComponent, children: [
    { path: 'dashboard', canActivate: [ AuthGuardService ], component: DashboardComponent },
    { path: 'getting-started/domain', canActivate: [ AuthGuardService ], component: GettingStartedComponent },
    { path: 'getting-started/products', canActivate: [ AuthGuardService ], component: ProductsComponent },
    { path: 'configure', canActivate: [ AuthGuardService ], component: ConfigureComponent },
    { path: 'inbox', canActivate: [ AuthGuardService ], component: InboxComponent },
    { path: 'sessions', canActivate: [ AuthGuardService ], component: SessionsComponent },
    { path: 'performance', canActivate: [ AuthGuardService ], component: AnalyticsComponent },
    { path: 'integration', canActivate: [ AuthGuardService ], component: IntegrationComponent },
    // { path: 'billing', canActivate: [ AuthGuardService ], component: BillingComponent },
    { path: 'profile', canActivate: [ AuthGuardService ], component: ProfileComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'shopify/redirect', canActivate: [ AuthGuardService ], component: EmptyComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    DashboardComponent,
    GettingStartedComponent,
    ConfigureComponent,
    InboxComponent,
    SessionsComponent,
    AnalyticsComponent,
    IntegrationComponent,
    BillingComponent,
    ProfileComponent,
    QuestionnaireComponent,
    SavedQuestionnaireComponent,
    ChatDatePipe,
    EmptyComponent,
    ProductsComponent,
    SessionsPipe,
    OrderbyDatePipe
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
    VfChatWidgetModule,
    InfiniteScrollModule
  ],
  exports: [RouterModule],
  providers: [DatePipe, AuthGuardService, AuthorizationService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
