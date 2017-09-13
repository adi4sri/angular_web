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
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var LoginComponent = (function () {
    function LoginComponent(auth, http, authHttp, router) {
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.router = router;
        if (auth.authenticated()) {
            this.router.navigate(['/hotels']);
        }
    }
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        this.auth.login(this.email, this.password, 'admin')
            .then(function (data) {
            console.log(data);
            data.user_type = 'admin';
            localStorage.setItem("admin", JSON.stringify(data));
            localStorage.setItem("user_roles1", JSON.stringify(data.user_roles_super));
            localStorage.setItem("user_roles2", JSON.stringify(data.user_roles_admin));
            _this.router.navigate(["/hotels"]);
            window.location.reload();
        })
            .catch(function (error) {
            _this.errorMessage = JSON.parse(error._body);
        }); // end post
    };
    LoginComponent.prototype.forgotPassword = function () {
        this.router.navigate(["/admin-forgot-password"]);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/login.component.html',
            providers: [auth_service_1.Auth]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
;
//# sourceMappingURL=login.component.js.map