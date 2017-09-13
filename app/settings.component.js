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
var hotels_service_1 = require("./providers/hotels.service");
var SettingsComponent = (function () {
    function SettingsComponent(auth, http, authHttp, workersService, hotelsService) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.workersService = workersService;
        this.hotelsService = hotelsService;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
        this.view_hotel_mode = JSON.parse(localStorage.getItem('view_hotel'));
        this.compare_pass = true;
        this.departments = [];
        this.dept_name = [];
        this.loader = false;
        this.dept_loader = false;
        this.role_loader = false;
        this.loader = true;
        this.id = this.user.id;
        this.worker = [];
        this.workersService.workerDetails(this.id)
            .then(function (data) {
            _this.worker = data[0];
            _this.departments = _this.worker.hotel_department;
            if (_this.departments == null) {
                _this.departments = [""];
            }
            console.log('Dept', _this.departments);
            _this.loader = false;
        })
            .catch(function (error) {
        });
        /*this.user_type = this.user.user_roles.user_type;
        this.workersService.getRoles(this.user_type)
            .then(data=>{
                this.role = data[0];
                localStorage.setItem("roles",JSON.stringify(data[0]));
                this.roles=JSON.parse(localStorage.getItem('roles'));
                console.log('Roles',this.roles);
                })
            .catch(error=>{
                console.log(error);
                });*/
        this.workersService.getBankInfo(this.user.id)
            .then(function (data) {
            if (data && data['funding-sources'][0].bankName) {
                _this.bankInfo = data['funding-sources'][0].bankName;
            }
            console.log(_this.bankInfo);
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    SettingsComponent.prototype.getBankInfo = function () {
        var _this = this;
        this.workersService.getBankInfo(this.user.id)
            .then(function (data) {
            if (data && data['funding-sources'][0].bankName) {
                _this.bankInfo = data['funding-sources'][0].bankName;
            }
            console.log(_this.bankInfo);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SettingsComponent.prototype.updateRoles = function () {
        var _this = this;
        this.loader = true;
        this.user_type = this.user.user_type;
        //this.login_type = this.user.login_type;
        this.workersService.workerRoles(this.role.dashboard, this.role.worker_employees, this.role.tip_comparison, this.role.tip_employee, this.role.reviews, this.user_type, this.role.login_type)
            .then(function (data) {
            _this.role_success = 'Roles updated successfully';
            console.log(_this.role_success);
            _this.loader = false;
        })
            .catch(function (error) {
            _this.errorRole = JSON.parse(error._body);
            _this.loader = false;
        });
        this.newRole = {};
        this.newRole.dashboard = this.role.dashboard;
        this.newRole.worker_employees = this.role.worker_employees;
        this.newRole.tip_comparison = this.role.tip_comparison;
        this.newRole.tip_employee = this.role.tip_employee;
        this.newRole.reviews = this.role.reviews;
        this.newRole.user_type = this.user_type;
        this.newRole.setting = true;
        console.log('SASAS', this.newRole);
        console.log('old', this.role);
        localStorage.setItem("user_roles2", JSON.stringify(this.newRole));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
    };
    SettingsComponent.prototype.updatePassword = function () {
        var _this = this;
        this.loader = true;
        this.id = this.user.id;
        if (this.new_pass == this.renew_pass) {
            this.compare_pass = true;
            this.workersService.updateWorkerPassword(this.id, this.current_pass, this.renew_pass)
                .then(function (data) {
                console.log('Password Changed');
                _this.success = true;
                _this.current_pass = '';
                _this.new_pass = '';
                _this.renew_pass = '';
                _this.loader = false;
            })
                .catch(function (error) {
                _this.errorMessage = JSON.parse(error._body);
                console.log(_this.errorMessage.message);
                _this.loader = false;
            });
        }
        else {
            this.compare_pass = false;
            this.loader = false;
            console.log('Passwords should be matched!');
        }
    };
    SettingsComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    SettingsComponent.prototype.addNewDept = function () {
        this.departments.push('');
        console.log(this.departments);
    };
    SettingsComponent.prototype.removeDept = function (index) {
        this.departments.splice(index, 1);
        console.log(this.departments);
    };
    SettingsComponent.prototype.addDepartments = function () {
        var _this = this;
        this.id = this.user.hotel_id;
        this.dept_loader = true;
        this.hotelsService.addDepartments(this.id, this.departments)
            .then(function (data) {
            console.log('Department Added');
            _this.success = 'Departments Updated';
            _this.dept_loader = false;
        })
            .catch(function (error) {
            _this.errorMessage = JSON.parse(error._body);
            console.log(_this.errorMessage.message);
            _this.dept_loader = false;
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings',
            templateUrl: 'app/settings.component.html',
            providers: [auth_service_1.Auth, workers_service_1.WorkersService, hotels_service_1.HotelsService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            angular2_jwt_1.AuthHttp,
            workers_service_1.WorkersService,
            hotels_service_1.HotelsService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
;
//# sourceMappingURL=settings.component.js.map