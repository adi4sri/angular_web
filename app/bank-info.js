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
var BankInfo = (function () {
    function BankInfo(auth, http, authHttp, workersService, route, router) {
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.workersService = workersService;
        this.route = route;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('admin'));
    }
    BankInfo.prototype.submitBankInfo = function () {
        var _this = this;
        var name = this.f_name + ' ' + this.l_name;
        this.workersService.bankInfo(this.user.id, this.routingNumber, this.accountNumber, this.type, name)
            .then(function (data) {
            console.log(data);
            _this.router.navigate(['/home']);
            setTimeout(function () { window.location.reload(); }, 100);
        })
            .catch(function (error) {
            _this.errorMessage = JSON.parse(error._body);
            _this.errorMessage = (JSON.parse(_this.errorMessage.message));
            console.log(_this.errorMessage);
            if (_this.errorMessage._embedded.errors) {
                _this.errors = _this.errorMessage._embedded.errors;
            }
        });
    };
    BankInfo = __decorate([
        core_1.Component({
            selector: 'bank-info',
            templateUrl: 'app/bank-info.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http,
            angular2_jwt_1.AuthHttp, workers_service_1.WorkersService,
            router_1.ActivatedRoute, router_1.Router])
    ], BankInfo);
    return BankInfo;
}());
exports.BankInfo = BankInfo;
;
//# sourceMappingURL=bank-info.js.map