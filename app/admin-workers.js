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
var AdminWorkers = (function () {
    function AdminWorkers(auth, http, workerService, authHttp, hotelService, pagerService) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.workerService = workerService;
        this.authHttp = authHttp;
        this.hotelService = hotelService;
        this.pagerService = pagerService;
        //API_URL: string = 'http://13.59.184.105:9000';
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.workerId = [];
        this.isCheckedAll = false;
        this.loader = false;
        this.pager = {};
        this.csvData = [];
        this.emails = [];
        this.checked_emails = [];
        this.empty_file = "Please select a CSV file to upload employees";
        console.log('user', this.user);
        this.id = this.user.id;
        this.worker = [];
        this.workerService.workerDetails(this.id)
            .then(function (data) {
            _this.worker = data[0];
        })
            .catch(function (error) {
        });
        this.loader = true;
        this.workerService.getAllWorkers()
            .then(function (data) {
            _this.workers = data;
            _this.setPage(1);
            _this.loader = false;
            console.log(data);
        });
        this.hotelService.getHotels()
            .then(function (data2) {
            _this.hotels = data2;
            _this.dropdown_hotels = data2;
            console.log(data2);
            _this.dropdown_hotels.unshift({ id: 'none', name: 'Please Select Hotel' });
            _this.workers_hotel = _this.dropdown_hotels[0].id;
            _this.loader = false;
        });
    }
    AdminWorkers.prototype.extractData = function (res) {
        var lines = res.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        this.emails = [];
        for (var i = 1; i < lines.length - 1; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        this.csvData = result; //JavaScript object
        for (var i = 0; i < this.csvData.length; i++) {
            if (!this.csvData[i].email) {
                this.empty_file = "Email is required in CSV.";
            }
            this.emails.push(this.csvData[i].email);
        }
        for (var i = 0; i <= this.emails.length; i++) {
            for (var j = i; j <= this.emails.length; j++) {
                if (i != j && this.emails[i] == this.emails[j]) {
                    this.empty_file = "CSV contains duplicate emails";
                }
            }
        }
        console.log(this.emails);
    };
    AdminWorkers.prototype.handleHotelSelect = function () {
        if (this.workers_hotel == 'none') {
            this.empty_file = "Please select hotel";
        }
        else {
            this.empty_file = "";
        }
    };
    AdminWorkers.prototype.handleFileSelect = function (evt) {
        var _this = this;
        var files = evt.target.files; // FileList object
        var file = files[0];
        var reader = new FileReader();
        if (!file) {
            this.empty_file = "Please select a CSV file to upload employees";
        }
        else {
            this.empty_file = "";
            this.handleHotelSelect();
            reader.readAsText(file);
            reader.onload = function (event) {
                var csv = event.target.result; // Content of CSV file
                //console.log(event.target.result);
                _this.extractData(csv); //Here you can call the above function.
            };
        }
    };
    AdminWorkers.prototype.checkEmp = function () {
        var _this = this;
        console.log(this.csvData);
        var emails = this.emails.join();
        this.loader = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.checked_emails = [];
        this.workerService.checkEmp(emails)
            .then(function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    _this.checked_emails.push(data[i].email);
                }
                _this.loader = false;
            }
            else {
                _this.workerService.bulkEmp(_this.csvData, _this.workers_hotel)
                    .then(function (data1) {
                    console.log(data1);
                    _this.workerService.getAllWorkers()
                        .then(function (data2) {
                        console.log(data2);
                        _this.workers = data2;
                        _this.successMessage = 'Employees added successfully';
                        _this.loader = false;
                    });
                })
                    .catch(function (error1) {
                    _this.errorMessage = 'Cannot add employees! One or more emails in data are already exist in Dwolla';
                    console.log(_this.errorMessage);
                    _this.loader = false;
                });
            }
        })
            .catch(function (error) {
            console.log(error);
            _this.loader = false;
        });
    };
    AdminWorkers.prototype.updateWorker = function (worker_Id, status) {
        var _this = this;
        this.loader = true;
        this.workerService.updateWorkers(worker_Id, status)
            .then(function (data) {
            _this.loader = false;
        });
    };
    AdminWorkers.prototype.select_hotel = function (hotel) {
        console.log(hotel);
    };
    AdminWorkers.prototype.selectId = function (value) {
        if (this.workerId.includes(value)) {
            this.workerId.splice(this.workerId.indexOf(value), 1);
        }
        else {
            this.workerId.push(value);
        }
        console.log('saalim', this.workerId);
    };
    AdminWorkers.prototype.selectAllId = function () {
        console.log(this.isCheckedAll);
        this.workerId = [];
        if (this.isCheckedAll) {
            this.workerId = [];
        }
        else {
            this.workerId = [];
            for (var i = 0; i < this.workers.length; i++) {
                this.workerId.push(this.workers[i].id);
            }
        }
        this.isCheckedAll = !this.isCheckedAll;
        console.log('saalim1', this.workerId);
    };
    AdminWorkers.prototype.isChecked = function (value) {
        return this.workerId.includes(value);
    };
    AdminWorkers.prototype.select_login = function (value) {
        this.login_type = value;
    };
    AdminWorkers.prototype.deleteWorker = function () {
        var _this = this;
        this.loader = true;
        this.workerService.deleteWorkers(this.workerId)
            .then(function (data) {
            _this.loader = false;
            _this.workers = data;
            console.log('data');
            _this.workerService.getAllWorkers()
                .then(function (data) {
                _this.workers = data;
                _this.setPage(1);
                console.log(data);
                _this.loader = false;
            }); // close refresh
        });
    };
    AdminWorkers.prototype.showForm = function () {
        this.workerForm = true;
    };
    AdminWorkers.prototype.hideForm = function () {
        this.workerForm = false;
    };
    AdminWorkers.prototype.showUpdateForm = function (id) {
        var _this = this;
        this.updateForm = true;
        this.workerService.workerDetails(id)
            .then(function (data) {
            _this.worker = data[0];
            console.log('Worker', _this.worker);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AdminWorkers.prototype.hideUpdateForm = function () {
        this.updateForm = true;
    };
    AdminWorkers.prototype.updateWorkerInfo = function () {
        var _this = this;
        this.loader = true;
        this.workerService.updateWorkerInfo(this.worker.name, this.worker.email, this.worker.id, this.worker.department, this.worker.status)
            .then(function (result) {
            console.log(result);
            _this.workerService.getAllWorkers()
                .then(function (data) {
                _this.workers = data;
                _this.loader = false;
            });
            $('#updateEmpModal').modal('hide');
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AdminWorkers.prototype.resend_account_link = function () {
        var _this = this;
        this.loader = true;
        this.workerService.resend_token(this.worker.email)
            .then(function (data) {
            _this.send_success = 'Email has been sent successfully!';
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AdminWorkers.prototype.submitAdminWorker = function () {
        var _this = this;
        if (this.user.user_type == 'admin') {
            this.hotel_id = this.hotel_data.id;
        }
        if (!this.dept_selected) {
            this.dept_selected = 'none';
        }
        this.name = this.f_name + " " + this.l_name;
        if (!this.l_name || !this.f_name || !this.email || this.hotel_id == "none" || !this.login_type) {
            this.errorMessage = 'Please fill all fields correctly';
        }
        else {
            this.loader = true;
            this.workerService.postWorker(this.name, this.email, this.hotel_id, this.login_type, this.dept_selected)
                .then(function (data2) {
                console.log(data2);
                // refresh pending worker list for display
                _this.workerService.getAllWorkers()
                    .then(function (data) {
                    _this.workers = data;
                    _this.setPage(1);
                    console.log(data);
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
                _this.validEmail = 'Sorry! User already exist with this email.';
            }); // end post
        }
    };
    AdminWorkers.prototype.downloadCSV = function () {
        var options = {
            showLabels: true
        };
        var emp = this.workers;
        for (var i = 0; i < emp.length; i++) {
            delete emp[i].account_balance;
            delete emp[i].account_creation;
            delete emp[i].age;
            delete emp[i].auth_id;
            delete emp[i].cust_id;
            delete emp[i].hotel_id;
            delete emp[i].id;
            delete emp[i].password_reset_token;
            delete emp[i].password_token_expires;
            delete emp[i].social_id;
            delete emp[i].social_type;
            delete emp[i].password;
        }
        new angular2_csv_1.Angular2Csv(emp, 'Employees', { headers: Object.keys(emp[0]) });
    };
    AdminWorkers.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workers.length, page);
        // get current page of items
        this.pagedItems = this.workers.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pager);
        console.log(this.pagedItems);
        console.log(this.tippers);
    };
    AdminWorkers = __decorate([
        core_1.Component({
            selector: 'ping',
            templateUrl: 'app/admin-workers.html',
            providers: [workers_service_1.WorkersService, hotels_service_1.HotelsService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            workers_service_1.WorkersService,
            angular2_jwt_1.AuthHttp,
            hotels_service_1.HotelsService,
            pager_service_1.PagerService])
    ], AdminWorkers);
    return AdminWorkers;
}());
exports.AdminWorkers = AdminWorkers;
;
//# sourceMappingURL=admin-workers.js.map