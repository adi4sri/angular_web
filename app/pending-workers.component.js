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
var PendingWorkersPage = (function () {
    function PendingWorkersPage(auth, http, workerService, authHttp) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.workerService = workerService;
        this.authHttp = authHttp;
        this.API_URL = 'http://13.59.184.105:9000';
        this.workerForm = false;
        // by hotel id
        this.workerService.getAllowedWorkers(1)
            .then(function (data2) {
            _this.workers = data2;
            console.log(data2);
        });
    }
    PendingWorkersPage.prototype.showForm = function () {
        this.workerForm = true;
    };
    PendingWorkersPage.prototype.hideForm = function () {
        this.workerForm = false;
    };
    // add worker to allowed workers list for signup - need to put in real hotel_id here
    PendingWorkersPage.prototype.submitWorker = function () {
        var _this = this;
        this.workerService.postAllowedWorker(this.workerName, this.email, this.department, 1)
            .then(function (data2) {
            console.log(data2);
            // refresh pending worker list for display
            _this.workerService.getAllowedWorkers(1)
                .then(function (data2) {
                _this.workers = data2;
                console.log(data2);
            });
            $('#addEmpModal').modal('hide');
        }); // end post
    };
    PendingWorkersPage = __decorate([
        core_1.Component({
            selector: 'ping',
            templateUrl: 'app/pending-workers.template.html',
            providers: [workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            workers_service_1.WorkersService,
            angular2_jwt_1.AuthHttp])
    ], PendingWorkersPage);
    return PendingWorkersPage;
}());
exports.PendingWorkersPage = PendingWorkersPage;
;
//# sourceMappingURL=pending-workers.component.js.map