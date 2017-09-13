"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_service_1 = require("./auth.service");
var angular2_jwt_1 = require("angular2-jwt");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var workers_service_1 = require("./providers/workers.service");
var AdminSettingsTabs = (function () {
    function AdminSettingsTabs(auth, http, authHttp, workersService) {
        /*this.user_type = this.role.user_type;
        this.workersService.getRoles(this.user_type)
            .then(data=>{
                this.roles = data[0];
                localStorage.setItem("roles",JSON.stringify(data[0]));
                //this.roles=JSON.parse(localStorage.getItem('roles'));
                console.log('Roles',this.roles);
                })
            .catch(error=>{
                console.log(error);
                });*/
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.workersService = workersService;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
        this.compare_pass = true;
        this.loader = false;
    }
    AdminSettingsTabs.prototype.updateRoles = function () {
        var _this = this;
        this.loader = true;
        this.user_type = this.user.user_type;
        //this.login_type = this.user.user_roles.login_type;
        this.workersService.adminRoles(this.role.location, this.role.admin_employees, this.role.tip_center, this.role.setting, this.user_type, this.role.login_type)
            .then(function (data) {
            _this.loader = false;
            _this.role_success = 'Roles has been updated successfully!';
        })
            .catch(function (error) {
            _this.loader = false;
        });
        this.newRole = {};
        this.newRole.location = this.role.location;
        this.newRole.admin_employees = this.role.admin_employees;
        this.newRole.tip_center = this.role.tip_center;
        this.newRole.setting = this.role.setting;
        this.newRole.user_type = this.user_type;
        this.newRole.login_type = this.role.login_type;
        console.log('NewRole', this.newRole);
        console.log('OldRole', this.role);
        console.log('UserType', this.user_type);
        console.log('LoginType', this.role.login_type);
        localStorage.setItem("user_roles2", JSON.stringify(this.newRole));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
    };
    AdminSettingsTabs.prototype.updatePassword = function () {
        var _this = this;
        this.id = this.user.id;
        this.loader = true;
        if (this.new_pass == this.renew_pass) {
            this.compare_pass = true;
            this.workersService.updateAdminPassword(this.id, this.current_pass, this.renew_pass)
                .then(function (data) {
                _this.success = 'Password has been updated successfully!';
                _this.loader = false;
                _this.current_pass = '';
                _this.new_pass = '';
                _this.renew_pass = '';
            })
                .catch(function (error) {
                _this.errorMessage = JSON.parse(error._body);
                _this.loader = false;
                console.log(_this.errorMessage.message);
            });
        }
        else {
            this.compare_pass = false;
            this.loader = false;
            console.log('Passwords should be matched!');
        }
    };
    AdminSettingsTabs = __decorate([
        core_1.Component({
            selector: 'admin-settings-tabs',
            templateUrl: 'app/admin-settings-tabs.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp,
            workers_service_1.WorkersService])
    ], AdminSettingsTabs);
    return AdminSettingsTabs;
}());
exports.AdminSettingsTabs = AdminSettingsTabs;
;
//# sourceMappingURL=admin-settings-tabs.js.map