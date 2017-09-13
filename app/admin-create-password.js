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
var AdminCreatePassword = (function () {
    function AdminCreatePassword(auth, http, authHttp, workersService, route, router) {
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.workersService = workersService;
        this.route = route;
        this.router = router;
    }
    AdminCreatePassword.prototype.createPassword = function () {
        var _this = this;
        if (this.password.length < 8) {
            this.errorMessage = 'Password must be atleast 8 characters long!';
        }
        else if (this.password != this.password2) {
            this.errorMessage = 'Password did not matched!';
        }
        else {
            this.token = this.route.snapshot.params['token'];
            this.workersService.createPassAdmin(this.token, this.password2)
                .then(function (data) {
                setTimeout(function (router) {
                    _this.router.navigate(["/login"]);
                }, 3000);
                _this.success = "Password has been reset. You will be redirected to login page in 3 seconds.";
            })
                .catch(function (error) {
                _this.errorMessage = JSON.parse(error._body.message);
                console.log(_this.errorMessage);
            });
        }
    };
    AdminCreatePassword = __decorate([
        core_1.Component({
            selector: 'admin-create-password',
            templateUrl: 'app/admin-create-password.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp,
            workers_service_1.WorkersService, router_1.ActivatedRoute, router_1.Router])
    ], AdminCreatePassword);
    return AdminCreatePassword;
}());
exports.AdminCreatePassword = AdminCreatePassword;
;
//# sourceMappingURL=admin-create-password.js.map