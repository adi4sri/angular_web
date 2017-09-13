import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {APP_BASE_HREF} from '@angular/common';
import { AUTH_PROVIDERS }      from 'angular2-jwt';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { PingComponent }       from './ping.component';
import { WorkersPage }       from './workers.component';
import { PendingWorkersPage }       from './pending-workers.component';
import { HotelsPage }       from './hotels.component';
import { FeedbackComponent }       from './feedback.component';
import { EmployeeTipsComponent }       from './employee.tips.component';
import { TipComparisonComponent }       from './tip.comparison.component';
import { DwollaComponent }       from './dwolla.component';
import { SettingsComponent }       from './settings.component';
import { LoginComponent }       from './login.component';
import { DefaultComponent }       from './default';
import { WorkersService }       from './providers/workers.service';
import { TipsService }       from './providers/tips.service';
import { HotelsService }       from './providers/hotels.service';
import { AuthGuard }       from './auth-guard.service';
import { Auth }       from './auth.service';
import { Page404Component }       from './page-404.component';
import { WorkerLoginComponent }       from './worker-login.component';
import { TippersComponent }       from './tippers.component';
import { AdminSettingsComponent }       from './admin-settings.component';
import { AdminSettingsTabs }       from './admin-settings-tabs';
import { ForgotPassword }       from './forgot-password';
import { CreatePassword }       from './create-password';
import { CreateNewPassword }       from './create-new-password';
import { AdminForgotPassword }       from './admin-forgot-password';
import { AdminCreatePassword }       from './admin-create-password';
import { AdminCreateNewPassword }       from './admin-create-new-password';
import { GuestResetPassword }       from './guest-reset-password';
import { AdminWorkers }       from './admin-workers';
import { WorkerTipsComponent }       from './worker.tips.component';
import { WorkerTipComparisonComponent }       from './worker.tip.comparison.component';
import { BankInfo }    from './bank-info';

import { MyFilterPipe } from './my-filter.pipe';
import { MyDatePipe } from './date-pipe';
import { PagerService } from './pager-service';

import { routing,
         appRoutingProviders } from './app.routes';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PingComponent,
        WorkersPage,
        PendingWorkersPage,
        HotelsPage,
        FeedbackComponent,
        EmployeeTipsComponent,
        TipComparisonComponent,
        DwollaComponent,
        SettingsComponent,
        LoginComponent,
        MyFilterPipe,
        MyDatePipe,
        Page404Component,
        DefaultComponent,
        WorkerLoginComponent,
        TippersComponent,
        AdminSettingsComponent,
        AdminSettingsTabs,
        ForgotPassword,
        CreatePassword,
        AdminForgotPassword,
        AdminCreatePassword,
        AdminCreateNewPassword,
        CreateNewPassword,
        GuestResetPassword,
        AdminWorkers,
        WorkerTipsComponent,
        WorkerTipComparisonComponent,
        BankInfo
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS,
        WorkersService,
        TipsService,
        HotelsService,
        AuthGuard,
        Auth,
        PagerService,
        {provide: APP_BASE_HREF, useValue : '/' }
    ],
    imports:      [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        JsonpModule,
        ChartsModule,
        MyDateRangePickerModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
