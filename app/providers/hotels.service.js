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
require("rxjs/add/operator/map");
var angular2_jwt_1 = require("angular2-jwt");
var auth_service_1 = require("../auth.service");
var HotelsService = (function () {
    function HotelsService(http, authHttp, auth) {
        //var toke = localStorage.getItem('id_token');
        this.http = http;
        this.authHttp = authHttp;
        this.auth = auth;
        this.url = 'http://13.59.184.105:9000/hotels/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        //this.userAuthObj = auth.user;
        //this.authId = this.userAuthObj.user_id.substring(6); //remove auth0 header
    }
    HotelsService.prototype.countEmp = function (hotel_id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/count_workers/' + hotel_id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    //get hotels
    HotelsService.prototype.getHotels = function () {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    HotelsService.prototype.updateHotels = function (hotelId, hotelStatus) {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve) {
            var json = {
                id: hotelId,
                status: hotelStatus
            };
            var params = json;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post(_this.url + '/status', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    HotelsService.prototype.addDepartments = function (hotel_id, departments) {
        var _this = this;
        return new Promise(function (resolve) {
            var json = {
                id: hotel_id,
                departments: departments
            };
            var body = json;
            _this.http.post(_this.url + '/department', body, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    HotelsService.prototype.deleteHotels = function (hotelId) {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve) {
            var json = {
                id: hotelId
            };
            var params = json;
            _this.http.post(_this.url + 'delete', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    HotelsService.prototype.postHotel = function (hotelName, hotelCity, hotelAddress, hotelZip, hotelEmail, hotelEmployee) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = {
                name: hotelName,
                city: hotelCity,
                address: hotelAddress,
                zip_code: hotelZip,
                contact_email: hotelEmail,
                emp_name: hotelEmployee
            };
            var params = json;
            _this.http.post(_this.url, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //this.userRes = data;
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log("Finished"); });
        });
    };
    HotelsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.Auth])
    ], HotelsService);
    return HotelsService;
}());
exports.HotelsService = HotelsService;
//# sourceMappingURL=hotels.service.js.map