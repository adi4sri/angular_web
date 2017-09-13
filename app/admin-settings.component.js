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
var AdminSettingsComponent = (function () {
    function AdminSettingsComponent(auth, http, workerService, authHttp) {
        this.auth = auth;
        this.http = http;
        this.workerService = workerService;
        this.authHttp = authHttp;
    }
    AdminSettingsComponent.prototype.select_login = function (value) {
        this.login_type = value;
    };
    AdminSettingsComponent.prototype.submitAdmin = function () {
        var _this = this;
        this.name = this.fname + ' ' + this.lname;
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (!this.fname || !this.lname || !this.email || !re.test(this.email)) {
            this.errorForm = "Please fill all fields correctly";
        }
        else {
            this.workerService.postAdmin(this.name, this.email, this.login_type)
                .then(function (data2) {
                console.log(data2);
                // refresh pending worker list for display
                $('#addEmp').modal('hide');
                _this.name = '';
                _this.email = '';
                _this.hotel_id = '';
                _this.login_type = '';
                _this.success = 'New user added successfully! An email has been sent to create password for login to bTIPt.';
            })
                .catch(function (error) {
                _this.errorMessage = JSON.parse(error._body);
            }); // end post
        }
    };
    AdminSettingsComponent = __decorate([
        core_1.Component({
            selector: 'admin-settings',
            templateUrl: 'app/admin-settings.component.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            workers_service_1.WorkersService,
            angular2_jwt_1.AuthHttp])
    ], AdminSettingsComponent);
    return AdminSettingsComponent;
}());
exports.AdminSettingsComponent = AdminSettingsComponent;
;
//# sourceMappingURL=admin-settings.component.js.map