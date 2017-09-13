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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var Auth = (function () {
    function Auth(http, router) {
        this.http = http;
        this.router = router;
        this.url = 'http://13.59.184.105:9000/';
        this.user = localStorage.getItem('admin');
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        // Add callback for lock `authenticated` event
    }
    Auth.prototype.login = function (email, password, user_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { email: email, password: password, user_type: user_type };
            console.log(data);
            var postUrl = _this.url + 'users/admin/login';
            _this.http
                .post(postUrl, data, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.user = data;
                localStorage.setItem('id_token', data.id);
                localStorage.setItem('auth_id', data.id);
                resolve(data);
            }, function (error) {
                reject(error);
                console.log(error.json());
            });
        });
    };
    ;
    Auth.prototype.workerLogin = function (email, password, user_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { email: email, password: password, user_type: user_type };
            console.log(data);
            var postUrl = _this.url + 'users/worker/login';
            _this.http
                .post(postUrl, data, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.user = data;
                localStorage.setItem('id_token', data.id);
                localStorage.setItem('auth_id', data.id);
                resolve(data);
            }, function (error) {
                reject(error);
                console.log(error.json());
            });
        });
    };
    ;
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        if (localStorage.getItem('admin') || localStorage.getItem('worker')) {
            return true;
        }
        else {
            return false;
        }
    };
    ;
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('admin');
        localStorage.removeItem('user_roles1');
        localStorage.removeItem('user_roles2');
        localStorage.removeItem('id_token');
        localStorage.removeItem('auth_id');
        localStorage.removeItem('view_hotel');
        //location.replace("/login");
        // this.router.navigate(["login"]);
    };
    ;
    Auth = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
;
//# sourceMappingURL=auth.service.js.map