"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home.component");
var ping_component_1 = require("./ping.component");
var feedback_component_1 = require("./feedback.component");
var workers_component_1 = require("./workers.component");
var admin_workers_1 = require("./admin-workers");
var pending_workers_component_1 = require("./pending-workers.component");
var hotels_component_1 = require("./hotels.component");
var employee_tips_component_1 = require("./employee.tips.component");
var tip_comparison_component_1 = require("./tip.comparison.component");
var dwolla_component_1 = require("./dwolla.component");
var settings_component_1 = require("./settings.component");
var login_component_1 = require("./login.component");
var auth_guard_service_1 = require("./auth-guard.service");
var page_404_component_1 = require("./page-404.component");
var default_1 = require("./default");
var worker_login_component_1 = require("./worker-login.component");
var tippers_component_1 = require("./tippers.component");
var admin_settings_component_1 = require("./admin-settings.component");
var admin_settings_tabs_1 = require("./admin-settings-tabs");
var forgot_password_1 = require("./forgot-password");
var create_password_1 = require("./create-password");
var create_new_password_1 = require("./create-new-password");
var admin_forgot_password_1 = require("./admin-forgot-password");
var admin_create_password_1 = require("./admin-create-password");
var admin_create_new_password_1 = require("./admin-create-new-password");
var guest_reset_password_1 = require("./guest-reset-password");
var worker_tips_component_1 = require("./worker.tips.component");
var worker_tip_comparison_component_1 = require("./worker.tip.comparison.component");
var bank_info_1 = require("./bank-info");
var user = JSON.parse(localStorage.getItem('admin'));
var appRoutes = [
    { path: '', redirectTo: user ? (user.user_type == 'worker' ? (user.login_type == '1' ? '/settings' : '/home') : '/hotels') : '/default', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'ping', component: ping_component_1.PingComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'workers', component: workers_component_1.WorkersPage, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'pending_workers', component: pending_workers_component_1.PendingWorkersPage, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'hotels', component: hotels_component_1.HotelsPage, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'feedback', component: feedback_component_1.FeedbackComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'employee_tips', component: employee_tips_component_1.EmployeeTipsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'worker_tips', component: worker_tips_component_1.WorkerTipsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'tip_comparison', component: tip_comparison_component_1.TipComparisonComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'worker_tip_comparison', component: worker_tip_comparison_component_1.WorkerTipComparisonComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'dwolla', component: dwolla_component_1.DwollaComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'bank-info', component: bank_info_1.BankInfo },
    { path: 'default', component: default_1.DefaultComponent },
    { path: 'worker-login', component: worker_login_component_1.WorkerLoginComponent },
    { path: 'tippers', component: tippers_component_1.TippersComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'admin_settings', component: admin_settings_component_1.AdminSettingsComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'admin_settingsTab', component: admin_settings_tabs_1.AdminSettingsTabs, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'forgot-password', component: forgot_password_1.ForgotPassword },
    { path: 'create-password/:token', component: create_password_1.CreatePassword },
    { path: 'create-new-password', component: create_new_password_1.CreateNewPassword },
    { path: 'admin-forgot-password', component: admin_forgot_password_1.AdminForgotPassword },
    { path: 'admin-create-password/:token', component: admin_create_password_1.AdminCreatePassword },
    { path: 'admin-create-new-password/:token', component: admin_create_new_password_1.AdminCreateNewPassword },
    { path: 'guest-reset-password/:token', component: guest_reset_password_1.GuestResetPassword },
    { path: 'admin-workers', component: admin_workers_1.AdminWorkers },
    { path: '**', component: page_404_component_1.Page404Component }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map