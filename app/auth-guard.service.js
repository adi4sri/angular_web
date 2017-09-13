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
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var angular2_jwt_1 = require("angular2-jwt");
var http_1 = require("@angular/http");
var AuthGuard = (function () {
    function AuthGuard(router, auth, http, authHttp) {
        this.router = router;
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.user = JSON.parse(localStorage.getItem('admin'));
    }
    AuthGuard.prototype.canActivate = function () {
        console.log('i am checking to see if you are logged in');
        if (!this.auth.authenticated()) {
            this.router.navigate(['/default']);
            //document.write('Please Login to continue');
            var node = document.createElement("div");
            node.setAttribute('class', 'alert alert-danger alert-dismissable login-alert');
            var text = document.createTextNode('Please Login first to access the content');
            node.appendChild(text);
            document.getElementById('main').appendChild(node);
            var childNode = document.createElement("a");
            childNode.setAttribute('class', 'close');
            childNode.setAttribute('data-dismiss', 'alert');
            var linkText = document.createTextNode('x');
            childNode.appendChild(linkText);
            node.insertBefore(childNode, node.firstChild);
        }
        else {
            return true;
        }
    };
    AuthGuard.prototype.canActivateChild = function () {
        console.log('checking child route access');
        return true;
    };
    AuthGuard.prototype.canLoad = function () {
        console.log('check load');
        if (this.auth.authenticated() && this.user.user_type == 'worker') {
            this.router.navigate(['/home']);
            return false;
        }
        if (this.auth.authenticated() && this.user.user_type == 'admin') {
            this.router.navigate(['/hotels']);
            return false;
        }
        //return true;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
;
//# sourceMappingURL=auth-guard.service.js.map