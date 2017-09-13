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
var router_1 = require("@angular/router");
var GuestResetPassword = (function () {
    function GuestResetPassword(auth, http, authHttp, workersService, route, router) {
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.workersService = workersService;
        this.route = route;
        this.router = router;
    }
    GuestResetPassword.prototype.createPassword = function () {
        var _this = this;
        if (this.password != this.password2) {
            this.errorMessage = 'Password did not matched!';
        }
        else {
            this.token = this.route.snapshot.params['token'];
            this.workersService.resetPassGuest(this.token, this.password2)
                .then(function (data) {
                _this.success = "Password has been reset. You can now login to bTIPt app with the new password.";
            })
                .catch(function (error) {
                if (error._body.message) {
                    _this.errorMessage = error._body.message;
                    //	console.log(this.errorMessage);
                }
                else {
                    _this.errorMessage = "Invaild Request. Please contact adminstrator, if you are lost.";
                }
            });
        }
    };
    GuestResetPassword = __decorate([
        core_1.Component({
            selector: 'guest-reset-password',
            templateUrl: 'app/guest-reset-password.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp,
            workers_service_1.WorkersService, router_1.ActivatedRoute, router_1.Router])
    ], GuestResetPassword);
    return GuestResetPassword;
}());
exports.GuestResetPassword = GuestResetPassword;
;
//# sourceMappingURL=guest-reset-password.js.map