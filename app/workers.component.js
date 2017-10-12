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
var workers_service_1 = require("./providers/workers.service");
var hotels_service_1 = require("./providers/hotels.service");
var pager_service_1 = require("./pager-service");
var WorkersPage = (function () {
    function WorkersPage(auth, http, workerService, authHttp, pagerService, hotelService) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.workerService = workerService;
        this.authHttp = authHttp;
        this.pagerService = pagerService;
        this.hotelService = hotelService;
        //API_URL: string = 'http://13.59.184.105:9000';
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.workerId = [];
        this.isCheckedAll = false;
        this.loader = false;
        this.pager = {};
        this.id = this.user.id;
        this.worker = [];
        this.workerService.workerDetails(this.id)
            .then(function (data) {
            _this.worker = data[0];
        })
            .catch(function (error) {
        });
        this.loader = true;
        this.workerService.getWorkers(this.user.hotel_id)
            .then(function (data) {
            _this.workers = data;
            console.log(_this.workers);
            _this.setPage(1);
            _this.loader = false;
        });
        this.hotelService.getHotels()
            .then(function (data2) {
            _this.hotels = data2;
            _this.loader = false;
        });
        console.log('USER', this.user);
    }
    WorkersPage.prototype.search_worker = function () {
        var _this = this;
        this.loader = true;
        this.workerService.searchWorker(this.searchWorker)
            .then(function (data) {
            _this.workers = data;
            _this.loader = false;
            if (data.length > 0) {
                _this.setPage(1);
            }
        })
            .catch(function (error) {
            _this.loader = false;
        });
    };
    WorkersPage.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workers.length, page);
        // get current page of items
        this.pagedItems = this.workers.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    WorkersPage.prototype.updateWorker = function (worker_Id, status) {
        var _this = this;
        this.loader = true;
        this.workerService.updateWorkers(worker_Id, status)
            .then(function (data) {
            _this.loader = false;
        });
    };
    WorkersPage.prototype.select_hotel = function (hotel) {
        console.log(hotel);
    };
    WorkersPage.prototype.selectId = function (value) {
        if (this.workerId.includes(value)) {
            this.workerId.splice(this.workerId.indexOf(value), 1);
        }
        else {
            this.workerId.push(value);
        }
    };
    WorkersPage.prototype.selectAllId = function () {
        console.log(this.isCheckedAll);
        this.workerId = [];
        if (this.isCheckedAll) {
            this.workerId = [];
        }
        else {
            this.workerId = [];
            for (var i = 0; i < this.workers.length; i++) {
                if (this.workers[i].id !== this.id) {
                    this.workerId.push(this.workers[i].id);
                }
            }
        }
        this.isCheckedAll = !this.isCheckedAll;
    };
    WorkersPage.prototype.isChecked = function (value) {
        return this.workerId.includes(value);
    };
    WorkersPage.prototype.select_login = function (value) {
        this.login_type = value;
    };
    WorkersPage.prototype.deleteWorker = function () {
        var _this = this;
        this.loader = true;
        this.workerService.deleteWorkers(this.workerId)
            .then(function (data) {
            _this.workers = data;
            _this.loader = false;
            _this.workerService.getWorkers(_this.user.hotel_id)
                .then(function (data) {
                _this.workers = data;
                _this.setPage(1);
                _this.loader = false;
            }); // close refresh
        });
    };
    WorkersPage.prototype.showForm = function () {
        this.workerForm = true;
    };
    WorkersPage.prototype.hideForm = function () {
        this.workerForm = false;
    };
    WorkersPage.prototype.showUpdateForm = function (id) {
        var _this = this;
        this.updateForm = true;
        this.workerService.workerDetails(id)
            .then(function (data) {
            _this.worker = data[0];
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    WorkersPage.prototype.hideUpdateForm = function () {
        this.updateForm = true;
    };
    WorkersPage.prototype.updateWorkerInfo = function () {
        var _this = this;
        this.loader = true;
        this.workerService.updateWorkerInfo(this.worker.name, this.worker.email, this.worker.id, this.worker.department, this.worker.status, this.worker.login_type)
            .then(function (result) {
            _this.workerService.getWorkers(_this.user.hotel_id)
                .then(function (data) {
                _this.workers = data;
                _this.setPage(1);
                _this.loader = false;
            });
            $('#updateEmpModal').modal('hide');
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    WorkersPage.prototype.resend_account_link = function () {
        var _this = this;
        this.loader = true;
        this.workerService.resend_token(this.worker.email, this.worker.hotel_slug)
            .then(function (data) {
            _this.send_success = 'Email has been sent successfully!';
            _this.loader = false;
            setTimeout(function () {
                document.getElementById("send_success").style.display = 'none';
            }, 3000);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    WorkersPage.prototype.submitWorker = function () {
        var _this = this;
        if (this.user.user_type == 'worker') {
            this.hotel_id = this.user.hotel_id;
        }
        if (!this.hotel_department) {
            this.hotel_department = "--";
        }
        this.loader = true;
        this.name = this.f_name + " " + this.l_name;
        if (!this.l_name || !this.f_name || !this.email || this.hotel_id == "none" || !this.login_type) {
            this.errorMessage = 'Please fill all fields correctly';
        }
        else {
            this.workerService.postWorker(this.name, this.email, this.hotel_id, this.login_type, this.hotel_department, this.user.hotel_slug)
                .then(function (data2) {
                // refresh pending worker list for display
                _this.workerService.getWorkers(_this.user.hotel_id)
                    .then(function (data) {
                    _this.workers = data;
                    _this.setPage(1);
                    _this.loader = false;
                });
                $('#addEmpModal').modal('hide');
                _this.f_name = '';
                _this.l_name = '';
                _this.email = '';
                _this.hotel_id = '';
                _this.login_type = '';
            })
                .catch(function (error) {
                var msg = JSON.parse(error._body);
                if (msg) {
                    _this.validEmail = 'Account already exist with this email!';
                }
                _this.loader = false;
            }); // end post
        }
    };
    WorkersPage.prototype.downloadCSV = function () {
        var emp = [];
        for (var i = 0; i < this.workers.length; i++) {
            emp.push({
                name: this.workers[i].name,
                login_type: this.workers[i].login_type == '0' ? 'Manager' : 'Employee',
                email: this.workers[i].email,
                department: this.workers[i].department,
                status: this.workers[i].status == '0' ? 'Inactive' : 'Active',
                activity: this.workers[i].activity,
                hotel_name: this.workers[i].hotel_name
            });
        }
        new angular2_csv_1.Angular2Csv(emp, 'Employees', { headers: Object.keys(emp[0]) });
    };
    WorkersPage = __decorate([
        core_1.Component({
            selector: 'ping',
            templateUrl: 'app/workers.template.html',
            providers: [workers_service_1.WorkersService, hotels_service_1.HotelsService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            workers_service_1.WorkersService,
            angular2_jwt_1.AuthHttp,
            pager_service_1.PagerService,
            hotels_service_1.HotelsService])
    ], WorkersPage);
    return WorkersPage;
}());
exports.WorkersPage = WorkersPage;
;
//# sourceMappingURL=workers.component.js.map