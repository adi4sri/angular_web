"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var mydaterangepicker_1 = require("mydaterangepicker");
var common_1 = require("@angular/common");
var angular2_jwt_1 = require("angular2-jwt");
var ng2_charts_1 = require("ng2-charts");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home.component");
var ping_component_1 = require("./ping.component");
var workers_component_1 = require("./workers.component");
var pending_workers_component_1 = require("./pending-workers.component");
var hotels_component_1 = require("./hotels.component");
var feedback_component_1 = require("./feedback.component");
var employee_tips_component_1 = require("./employee.tips.component");
var tip_comparison_component_1 = require("./tip.comparison.component");
var dwolla_component_1 = require("./dwolla.component");
var settings_component_1 = require("./settings.component");
var login_component_1 = require("./login.component");
var default_1 = require("./default");
var workers_service_1 = require("./providers/workers.service");
var tips_service_1 = require("./providers/tips.service");
var hotels_service_1 = require("./providers/hotels.service");
var auth_guard_service_1 = require("./auth-guard.service");
var auth_service_1 = require("./auth.service");
var page_404_component_1 = require("./page-404.component");
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
var admin_workers_1 = require("./admin-workers");
var worker_tips_component_1 = require("./worker.tips.component");
var worker_tip_comparison_component_1 = require("./worker.tip.comparison.component");
var bank_info_1 = require("./bank-info");
var my_filter_pipe_1 = require("./my-filter.pipe");
var date_pipe_1 = require("./date-pipe");
var pager_service_1 = require("./pager-service");
var app_routes_1 = require("./app.routes");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                ping_component_1.PingComponent,
                workers_component_1.WorkersPage,
                pending_workers_component_1.PendingWorkersPage,
                hotels_component_1.HotelsPage,
                feedback_component_1.FeedbackComponent,
                employee_tips_component_1.EmployeeTipsComponent,
                tip_comparison_component_1.TipComparisonComponent,
                dwolla_component_1.DwollaComponent,
                settings_component_1.SettingsComponent,
                login_component_1.LoginComponent,
                my_filter_pipe_1.MyFilterPipe,
                date_pipe_1.MyDatePipe,
                page_404_component_1.Page404Component,
                default_1.DefaultComponent,
                worker_login_component_1.WorkerLoginComponent,
                tippers_component_1.TippersComponent,
                admin_settings_component_1.AdminSettingsComponent,
                admin_settings_tabs_1.AdminSettingsTabs,
                forgot_password_1.ForgotPassword,
                create_password_1.CreatePassword,
                admin_forgot_password_1.AdminForgotPassword,
                admin_create_password_1.AdminCreatePassword,
                admin_create_new_password_1.AdminCreateNewPassword,
                create_new_password_1.CreateNewPassword,
                guest_reset_password_1.GuestResetPassword,
                admin_workers_1.AdminWorkers,
                worker_tips_component_1.WorkerTipsComponent,
                worker_tip_comparison_component_1.WorkerTipComparisonComponent,
                bank_info_1.BankInfo
            ],
            providers: [
                app_routes_1.appRoutingProviders,
                angular2_jwt_1.AUTH_PROVIDERS,
                workers_service_1.WorkersService,
                tips_service_1.TipsService,
                hotels_service_1.HotelsService,
                auth_guard_service_1.AuthGuard,
                auth_service_1.Auth,
                pager_service_1.PagerService,
                { provide: common_1.APP_BASE_HREF, useValue: '/' }
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routes_1.routing,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                ng2_charts_1.ChartsModule,
                mydaterangepicker_1.MyDateRangePickerModule
            ],
            bootstrap: [app_component_1.AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map