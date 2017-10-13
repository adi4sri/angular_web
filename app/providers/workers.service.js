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
var WorkersService = (function () {
    function WorkersService(http, authHttp, auth) {
        //var toke = localStorage.getItem('id_token');
        this.http = http;
        this.authHttp = authHttp;
        this.auth = auth;
        this.url = 'http://13.59.184.105:9000/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        //this.userAuthObj = auth.user;
        //this.authId = this.userAuthObj.user_id.substring(6); //remove auth0 header
    }
    WorkersService.prototype.checkEmp = function (emails) {
        var _this = this;
        var json = { emails: emails };
        var params = json;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url + 'users/check_workers', json, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.bulkEmp = function (workers, hotel_id, slug) {
        var _this = this;
        var postData = {
            workers: workers,
            hotel_id: hotel_id,
            slug: slug
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url + 'users/worker/bulk', postData, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.getReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + 'reviews/review/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getAllReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + 'reviews/all_review/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.getAllEmpReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.url + 'reviews/all_emp_review/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.getReviewsGraph = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + 'reviews/graph/' + id, {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getReviewsEmpGraph = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.url + 'reviews/emp_graph/' + id, {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.getDailyReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + 'reviews/daily_review/' + id, {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getWeeklyReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + 'reviews/weekly_review/' + id, {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getMonthlyReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + 'reviews/monthly_review/' + id, {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getYearlyReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + 'reviews/yearly_review/' + id, {})
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getCountReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + 'reviews/review_count/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getCountEmpReviews = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + 'reviews/review_count_emp/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.getAllWorkers = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.url + 'users/worker')
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.workerDetails = function (worker_Id) {
        var _this = this;
        var json = {
            id: worker_Id
        };
        var params = json;
        return new Promise(function (resolve) {
            _this.http.post(_this.url + 'users/worker_details', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.deleteWorkers = function (workerlId) {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve, reject) {
            var json = {
                id: workerlId
            };
            var params = json;
            _this.http.post(_this.url + 'users/worker/delete', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.updateWorkers = function (worker_Id, workerStatus) {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve) {
            var json = {
                id: worker_Id,
                status: workerStatus
            };
            var params = json;
            _this.http.post(_this.url + 'users/worker/update', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    //get worker data by hotel
    WorkersService.prototype.getWorkers = function (hotelId) {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url + 'users/workers/hotel/' + hotelId)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.searchWorker = function (string) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var params = { string: string };
            _this.http.post(_this.url + 'users/search_worker', params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    //get pending worker data by hotel
    WorkersService.prototype.getAllowedWorkers = function (hotelId) {
        var _this = this;
        // Dont have the data yet
        return new Promise(function (resolve) {
            _this.http.get(_this.url + 'users/allowed_workers/' + hotelId)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    WorkersService.prototype.postAllowedWorker = function (workerName, email, department, hotel_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { hotel_id: hotel_id, name: workerName, email: email, department: department };
            var params = json;
            var postUrl = _this.url + 'users/allowed_workers';
            _this.http.post(postUrl, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //this.userRes = data;
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log("Finished"); });
        });
    };
    WorkersService.prototype.postWorker = function (name, email, hotel_id, login_type, department, slug) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { hotel_id: hotel_id, name: name, email: email, login_type: login_type, department: department, slug: slug };
            var params = json;
            var postUrl = _this.url + 'users/worker';
            _this.http.post(postUrl, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //this.userRes = data;
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log("Finished"); });
        });
    };
    WorkersService.prototype.workerSignup = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { email: email, password: password };
            var param = json;
            var postUrl = _this.url + 'users/worker/signup';
            _this.http.post(postUrl, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    WorkersService.prototype.bankInfo = function (userId, routingNumber, accountNumber, type, name, slug) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { routingNumber: routingNumber, accountNumber: accountNumber, type: type, name: name, slug: slug };
            var param = json;
            var postUrl = _this.url + 'users/worker/' + userId + '/funding-sources';
            _this.http.post(postUrl, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    WorkersService.prototype.getBankInfo = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var postUrl = _this.url + 'users/worker/' + userId + '/funding-sources';
            _this.http.get(postUrl)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); });
        });
    };
    WorkersService.prototype.updateBankInfo = function (userId, type, name, fundingId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { type: type, name: name };
            var param = json;
            var postUrl = _this.url + 'users/worker/' + userId + '/funding-sources/update/' + fundingId;
            _this.http.post(postUrl, param, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.deleteBankInfo = function (userId, fundingId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var postUrl = _this.url + 'users/worker/' + userId + '/funding-sources/delete/' + fundingId;
            _this.http.post(postUrl, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.setDefaultBank = function (userId, fundingId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var postUrl = _this.url + 'users/worker/' + userId + '/funding-sources/default/' + fundingId;
            _this.http.post(postUrl, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
    WorkersService.prototype.updateWorkerInfo = function (name, email, worker_id, department, status, login_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { name: name, email: email, id: worker_id, department: department, status: status, login_type: login_type };
            var params = json;
            var postUrl = _this.url + 'users/worker/update_info';
            _this.http.post(postUrl, params, _this.options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log("Finished"); });
        });
    };
    WorkersService.prototype.postAdmin = function (name, email, login_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var json = { name: name, email: email, login_type: login_type };
            var params = json;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var postUrl = _this.url + 'users/admin';
            _this.http.post(postUrl, params, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //this.userRes = data;
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log("Finished"); });
        });
    };
    WorkersService.prototype.updateWorkerPassword = function (id, current_pass, new_password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { id: id, password: current_pass, new_password: new_password };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/worker/change_password';
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data1) {
                resolve(data1);
            }, function (error) { return reject(error); }, function () { return console.log('Password Update Finished'); });
        });
    };
    WorkersService.prototype.updateAdminPassword = function (id, current_pass, new_password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { id: id, password: current_pass, new_password: new_password };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/admin/change_password';
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data1) {
                resolve(data1);
            }, function (error) { return reject(error); }, function () { return console.log('Password Update Finished'); });
        });
    };
    WorkersService.prototype.adminRoles = function (location, employees, tippers, setting, user_type, login_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { location: location, admin_employees: employees, tip_center: tippers, setting: setting, user_type: user_type, login_type: login_type };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/admin_user_roles';
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data1) {
                resolve(data1);
            }, function (error) { return reject(error); }, function () { return console.log('User Roles Updated'); });
        });
    };
    WorkersService.prototype.workerRoles = function (dashboard, employees, tip_comparison, tip_employee, reviews, user_type, login_type, hotel_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                dashboard: dashboard,
                employees: employees,
                tip_comparison: tip_comparison,
                tip_employee: tip_employee,
                reviews: reviews,
                user_type: user_type,
                login_type: login_type,
                hotel_id: hotel_id
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/worker_user_roles';
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data1) {
                resolve(data1);
            }, function (error) { return reject(error); }, function () { return console.log('User Roles Updated'); });
        });
    };
    WorkersService.prototype.resend_token = function (email, slug) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = { email: email, slug: slug };
            var params = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/worker/resend_token';
            _this.http.post(url, params, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) { resolve(data); }, function (error) { return reject(error); }, function () { return console.log('Email Sent'); });
        });
    };
    WorkersService.prototype.forgotPassword = function (email, slug) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                email: email,
                slug: slug
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/forgot_password';
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Email sent'); });
        });
    };
    WorkersService.prototype.forgotPassAdmin = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                email: email
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/admin/forgot_password';
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Email sent'); });
        });
    };
    WorkersService.prototype.createPassword = function (token, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                password: password
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/reset_password/' + token;
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Password reset successfully'); });
        });
    };
    WorkersService.prototype.createNewPassword = function (token, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                password: password
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/create_password/' + token;
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Password reset successfully'); });
        });
    };
    WorkersService.prototype.createPassAdmin = function (token, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                password: password
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/admin/reset_password/' + token;
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Password reset successfully'); });
        });
    };
    WorkersService.prototype.createNewPassAdmin = function (token, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                password: password
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/admin/create_password/' + token;
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Password reset successfully'); });
        });
    };
    WorkersService.prototype.resetPassGuest = function (token, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                password: password
            };
            var body = data;
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var url = _this.url + 'users/guest/reset_password/' + token;
            _this.http.post(url, body, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('Password reset successfully'); });
        });
    };
    WorkersService.prototype.getRoles = function (user_type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.url + 'users/user_roles/' + user_type;
            _this.http.get(url)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) { return reject(error); }, function () { return console.log('User roles finished'); });
        });
    };
    WorkersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, angular2_jwt_1.AuthHttp, auth_service_1.Auth])
    ], WorkersService);
    return WorkersService;
}());
exports.WorkersService = WorkersService;
//# sourceMappingURL=workers.service.js.map