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
var angular2_csv_1 = require("angular2-csv");
var tips_service_1 = require("./providers/tips.service");
var pager_service_1 = require("./pager-service");
var WorkerTipComparisonComponent = (function () {
    function WorkerTipComparisonComponent(auth, http, tipsService, authHttp, pagerService) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.tipsService = tipsService;
        this.authHttp = authHttp;
        this.pagerService = pagerService;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.loader = false;
        this.pager = {};
        this.loader = true;
        this.tipsService.workerTipsComparison(this.user.id)
            .then(function (data2) {
            _this.tips = data2;
            _this.setPage(1);
            _this.loader = false;
            console.log(data2);
        });
    }
    WorkerTipComparisonComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.tips.length, page);
        // get current page of items
        this.pagedItems = this.tips.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    WorkerTipComparisonComponent.prototype.downloadCSV = function () {
        var options = {
            showLabels: true
        };
        new angular2_csv_1.Angular2Csv(this.tips, 'Tips-Comparison', options);
    };
    WorkerTipComparisonComponent = __decorate([
        core_1.Component({
            selector: 'ping',
            templateUrl: 'app/worker.tip.comparison.component.html',
            providers: [tips_service_1.TipsService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            tips_service_1.TipsService,
            angular2_jwt_1.AuthHttp,
            pager_service_1.PagerService])
    ], WorkerTipComparisonComponent);
    return WorkerTipComparisonComponent;
}());
exports.WorkerTipComparisonComponent = WorkerTipComparisonComponent;
;
//# sourceMappingURL=worker.tip.comparison.component.js.map