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
var DefaultComponent = (function () {
    function DefaultComponent(auth, http, authHttp, router) {
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('admin'));
        if (this.auth.authenticated()) {
            if (this.user && this.user.user_type == 'admin') {
                this.router.navigate(['/hotels']);
            }
            else if (this.user && this.user.user_type == 'worker') {
                this.router.navigate(['/home']);
            }
        }
        else if (!this.auth.authenticated()) {
            var full = window.location.host;
            var parts = full.split('.');
            var sub_domain = parts[0];
            if (sub_domain == 'admin') {
                this.router.navigate(['/login']);
            }
            else {
                this.router.navigate(['/worker-login']);
            }
        }
    }
    DefaultComponent = __decorate([
        core_1.Component({
            selector: 'default',
            templateUrl: 'app/default.html',
            providers: [auth_service_1.Auth]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp, router_1.Router])
    ], DefaultComponent);
    return DefaultComponent;
}());
exports.DefaultComponent = DefaultComponent;
;
//# sourceMappingURL=default.js.map