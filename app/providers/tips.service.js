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
var TipsService = (function () {
    function TipsService(http, authHttp, auth) {
        this.http = http;
        this.authHttp = authHttp;
        this.auth = auth;
        this.url = 'http://13.59.184.105:9000/tips';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        //console.log(auth.user);
        //this.userAuthObj = auth.user;
    }
    TipsService.prototype.load = function () {
        var _this = this;
        if (this.data1) {
            return Promise.resolve(this.data1);
        }
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get('https://randomuser.me/api/?results=10')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data1 = data.results;
                resolve(_this.data1);
            });
        });
    };
    TipsService.prototype.monthly_chart_data = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/chart_data', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.weekly_chart_data = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/weekly_chart_data', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.yearly_chart_data = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/yearly_chart_data', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.daily_chart_data = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/daily_chart_data', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.top_tipped_emp = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/top_tipped_emp', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.yearly_top_tipped = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/yearly_top_tipped', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.weekly_top_tipped = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/weekly_top_tipped', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.daily_top_tipped = function (id) {
        var _this = this;
        var json = {
            id: id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/daily_top_tipped', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.getAllTips = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/all')
                .map(function (res) { return res.json(); })
                .subscribe(function (data2) {
                resolve(data2);
            });
        });
    };
    TipsService.prototype.chart = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/chart', {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data2) {
                resolve(data2);
            });
        });
    };
    TipsService.prototype.deleteTip = function (tipperId) {
        var _this = this;
        var json = {
            id: tipperId
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + '/delete', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data2) {
                resolve(data2);
            });
        });
    };
    TipsService.prototype.getTips = function (userID) {
        var _this = this;
        if (this.tipsResponse) {
            return Promise.resolve(this.tipsResponse);
        }
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/' + userID)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.tipsResponse = data;
                // make a display friendly timestamp
                for (var i = 0; i < _this.tipsResponse.length; i++) {
                    _this.tipsResponse[i].tip_time = new Date(_this.tipsResponse[i].tip_time);
                }
                resolve(_this.tipsResponse);
            });
        });
    };
    TipsService.prototype.getWorkerTips = function (userId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/workers/' + userId)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    // worker tip list
    TipsService.prototype.getTipsHotel = function (hotel) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/' + 'hotels/' + hotel)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                // make a display friendly timestamp
                /*for(let i = 0; i < this.tipsResponse.length; i++) {
                    this.tipsResponse[i].tip_time = new Date(this.tipsResponse[i].tip_time);
                }*/
                resolve(data);
            });
        });
    };
    TipsService.prototype.getTipsDateRange = function (hotel, start_date, end_date) {
        var _this = this;
        var json = {
            start_date: start_date,
            end_date: end_date
        };
        console.log(hotel, json);
        var params = json;
        var postUrl = this.url + '/' + 'tip_daterange/' + hotel;
        /*if (this.tipsResponse) {
          return Promise.resolve(this.tipsResponse);
        }*/
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.post(postUrl, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.tipsResponse = data;
                // make a display friendly timestamp
                /*for(let i = 0; i < this.tipsResponse.length; i++) {
                    this.tipsResponse[i].tip_time = new Date(this.tipsResponse[i].tip_time);
                }*/
                resolve(data);
            });
        });
    };
    TipsService.prototype.getWorkerTipsDateRange = function (workerId, start_date, end_date) {
        var _this = this;
        var json = {
            start_date: start_date,
            end_date: end_date
        };
        var params = json;
        var postUrl = this.url + '/worker_tip_daterange/' + workerId;
        /*if (this.tipsResponse) {
          return Promise.resolve(this.tipsResponse);
        }*/
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.post(postUrl, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.tipsResponse = data;
                resolve(data);
            });
        });
    };
    // tip calculations
    TipsService.prototype.adminTips = function (hotel) {
        var _this = this;
        if (this.tipsResponse) {
            return Promise.resolve(this.tipsResponse);
        }
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/' + 'tip_math/' + hotel)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.tipsResponse = data;
                resolve(_this.tipsResponse);
            });
        });
    };
    TipsService.prototype.workerTipsComparison = function (worker) {
        var _this = this;
        if (this.tipsResponse) {
            return Promise.resolve(this.tipsResponse);
        }
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/' + 'worker_tip_math/' + worker)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.tipsResponse = data;
                resolve(_this.tipsResponse);
            });
        });
    };
    // dashboard calculations
    TipsService.prototype.dashboard = function (hotel) {
        var _this = this;
        if (this.tipsResponse) {
            return Promise.resolve(this.tipsResponse);
        }
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url + '/' + 'dashboard/' + hotel)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.tipsResponse = data;
                resolve(_this.tipsResponse);
            });
        });
    };
    TipsService.prototype.confirmWorker = function (workerEmail) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://13.59.184.105:9000/users/worker/confirm/' + workerEmail)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.get_dwolla_transfers = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get('http://13.59.184.105:9000/users/dwolla/account/transfers')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    TipsService.prototype.postTip = function (tipAmount, workerEmail) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { guest_auth_id: _this.userAuthObj.user_id.substring(6), amount: tipAmount, worker_email: workerEmail };
            var params = json;
            var postUrl = _this.url;
            _this.http.post(postUrl, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //this.userRes = data;
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log("Finished"); });
        });
    };
    TipsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.Auth])
    ], TipsService);
    return TipsService;
}());
exports.TipsService = TipsService;
//# sourceMappingURL=tips.service.js.map