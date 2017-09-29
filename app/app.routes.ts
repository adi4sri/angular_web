import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { PingComponent }               from './ping.component';
import { FeedbackComponent }               from './feedback.component';
import { WorkersPage }       from './workers.component';
import { AdminWorkers }       from './admin-workers';
import { PendingWorkersPage }       from './pending-workers.component';
import { HotelsPage }       from './hotels.component';
import { EmployeeTipsComponent }       from './employee.tips.component';
import { TipComparisonComponent }       from './tip.comparison.component';
import { DwollaComponent }       from './dwolla.component';
import { SettingsComponent }       from './settings.component';
import { LoginComponent }       from './login.component';
import { AuthGuard }       from './auth-guard.service';
import { Page404Component }       from './page-404.component';
import { DefaultComponent }       from './default';
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
import { WorkerTipsComponent }       from './worker.tips.component';
import { WorkerTipComparisonComponent }       from './worker.tip.comparison.component';
import { BankInfo }    from './bank-info';
var user = JSON.parse(localStorage.getItem('admin'));
const appRoutes: Routes = [
  { path: '', redirectTo: user?(user.user_type=='worker'?(user.login_type=='1'?'/settings':'/home'):'/hotels'):'/default', pathMatch: 'full'},
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
  { path: 'ping', component: PingComponent, canActivate:[AuthGuard]},
  { path: 'workers', component: WorkersPage, canActivate:[AuthGuard]},
  { path: 'pending_workers', component: PendingWorkersPage, canActivate:[AuthGuard]},
  { path: 'hotels', component: HotelsPage, canActivate:[AuthGuard]},
  { path: 'feedback', component: FeedbackComponent, canActivate:[AuthGuard]},
  { path: 'employee_tips', component: EmployeeTipsComponent, canActivate:[AuthGuard]},
  { path: 'worker_tips', component: WorkerTipsComponent, canActivate:[AuthGuard]},
  { path: 'tip_comparison', component: TipComparisonComponent, canActivate:[AuthGuard]},
  { path: 'worker_tip_comparison', component: WorkerTipComparisonComponent, canActivate:[AuthGuard]},
  { path: 'dwolla', component: DwollaComponent, canActivate:[AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'bank-info', component: BankInfo},
  { path: 'default', component: DefaultComponent},
  { path: 'worker-login', component: WorkerLoginComponent},
  { path: 'tippers', component: TippersComponent, canActivate:[AuthGuard]},
  { path: 'admin_settings', component: AdminSettingsComponent, canActivate:[AuthGuard]},
  { path: 'admin_settingsTab', component: AdminSettingsTabs, canActivate:[AuthGuard]},
  { path: 'forgot-password', component: ForgotPassword},
  { path: 'create-password/:token', component: CreatePassword},
  { path: 'create-new-password', component: CreateNewPassword},
  { path: 'admin-forgot-password', component: AdminForgotPassword},
  { path: 'admin-create-password/:token', component: AdminCreatePassword},
  { path: 'admin-create-new-password/:token', component: AdminCreateNewPassword},
  { path: 'guest-reset-password/:token', component: GuestResetPassword},
  { path: 'admin-workers', component: AdminWorkers},
  { path: '**',  component: Page404Component}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);