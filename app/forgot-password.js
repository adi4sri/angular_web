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
var workers_service_1 = require("./providers/workers.service");
require("rxjs/add/operator/map");
var ForgotPassword = (function () {
    function ForgotPassword(workersService, http) {
        this.workersService = workersService;
        this.http = http;
    }
    ForgotPassword.prototype.forgot = function () {
        var _this = this;
        this.workersService.forgotPassword(this.email)
            .then(function (data) {
            _this.success = 'We have sent you an email. Please check your inbox to reset your password';
        })
            .catch(function (error) {
            _this.errorMessage = JSON.parse(error._body);
            console.log(_this.errorMessage);
        });
    };
    ForgotPassword = __decorate([
        core_1.Component({
            selector: 'forgot-password',
            templateUrl: 'app/forgot-password.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [workers_service_1.WorkersService, http_1.Http])
    ], ForgotPassword);
    return ForgotPassword;
}());
exports.ForgotPassword = ForgotPassword;
;
//# sourceMappingURL=forgot-password.js.map