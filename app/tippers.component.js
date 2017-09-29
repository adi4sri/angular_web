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
var angular2_csv_1 = require("angular2-csv");
var pager_service_1 = require("./pager-service");
var TippersComponent = (function () {
    function TippersComponent(auth, http, authHttp, tipsService, pagerService) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.tipsService = tipsService;
        this.pagerService = pagerService;
        //tippers: any[];
        this.tipperId = [];
        this.loader = false;
        this.pager = {};
        // initialize to page 1
        this.loader = true;
        this.tipsService.getAllTips()
            .then(function (data2) {
            _this.tippers = data2;
            //console.log(this.tippers);
            _this.loader = false;
            _this.setPage(1);
        });
    }
    TippersComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.tippers.length, page);
        // get current page of items
        this.pagedItems = this.tippers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    TippersComponent.prototype.isChecked = function (value) {
        return this.tipperId.includes(value);
    };
    TippersComponent.prototype.selectId = function (value) {
        if (this.tipperId.includes(value)) {
            this.tipperId.splice(this.tipperId.indexOf(value), 1);
        }
        else {
            this.tipperId.push(value);
        }
    };
    TippersComponent.prototype.selectAllId = function () {
        this.tipperId = [];
        if (this.isCheckedAll) {
            this.tipperId = [];
        }
        else {
            this.tipperId = [];
            for (var i = 0; i < this.tippers.length; i++) {
                this.tipperId.push(this.tippers[i].id);
            }
        }
        this.isCheckedAll = !this.isCheckedAll;
    };
    TippersComponent.prototype.deleteTipper = function () {
        var _this = this;
        this.loader = true;
        this.tipsService.deleteTip(this.tipperId)
            .then(function (data) {
            _this.tippers = data;
            _this.tipsService.getAllTips()
                .then(function (data) {
                _this.tippers = data;
                _this.setPage(1);
                _this.loader = false;
            }); // close refresh
        });
    };
    TippersComponent.prototype.downloadCSV = function () {
        var options = {
            showLabels: true
        };
        var tippers = this.tippers;
        for (var i = 0; i < tippers.length; i++) {
            delete tippers[i].guest_auth_id;
            delete tippers[i].guest_id;
            delete tippers[i].hotel_id;
            delete tippers[i].id;
            delete tippers[i].promotion_amount;
            delete tippers[i].worker_auth_id;
            delete tippers[i].worker_id;
        }
        new angular2_csv_1.Angular2Csv(this.tippers, 'Tippers', { headers: Object.keys(tippers[0]) });
    };
    TippersComponent = __decorate([
        core_1.Component({
            selector: 'tipper',
            templateUrl: 'app/tippers.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            angular2_jwt_1.AuthHttp,
            tips_service_1.TipsService,
            pager_service_1.PagerService])
    ], TippersComponent);
    return TippersComponent;
}());
exports.TippersComponent = TippersComponent;
;
//# sourceMappingURL=tippers.component.js.map