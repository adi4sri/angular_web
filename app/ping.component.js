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
var PingComponent = (function () {
    function PingComponent(auth, http, authHttp) {
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.API_URL = 'http://13.59.184.105:9000';
    }
    PingComponent.prototype.ping = function () {
        var _this = this;
        this.message = '';
        this.http.get(this.API_URL + "/ping")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.message = data.text; }, function (error) { return _this.message = error._body; });
    };
    PingComponent.prototype.securedPing = function () {
        var _this = this;
        this.message = '';
        this.authHttp.get(this.API_URL + "/secured/ping")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.message = data.text; }, function (error) { return _this.message = error._body || error; });
    };
    PingComponent = __decorate([
        core_1.Component({
            selector: 'ping',
            templateUrl: 'app/ping.template.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp])
    ], PingComponent);
    return PingComponent;
}());
exports.PingComponent = PingComponent;
;
//# sourceMappingURL=ping.component.js.map