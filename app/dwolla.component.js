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
var tips_service_1 = require("./providers/tips.service");
var DwollaComponent = (function () {
    function DwollaComponent(auth, http, tipsService, authHttp) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.tipsService = tipsService;
        this.authHttp = authHttp;
        this.loader = false;
        this.loader = true;
        this.tipsService.get_dwolla_transfers()
            .then(function (data2) {
            _this.transfers = data2;
            _this.loader = false;
            console.log(data2);
        });
    }
    DwollaComponent = __decorate([
        core_1.Component({
            selector: 'dwolla',
            templateUrl: 'app/dwolla.component.html',
            providers: [tips_service_1.TipsService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            tips_service_1.TipsService,
            angular2_jwt_1.AuthHttp])
    ], DwollaComponent);
    return DwollaComponent;
}());
exports.DwollaComponent = DwollaComponent;
;
//# sourceMappingURL=dwolla.component.js.map