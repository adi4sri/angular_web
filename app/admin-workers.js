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
        this.id = this.user.id;
        this.worker = [];
        this.workerService.workerDetails(this.id)
            .then(function (data) {
            _this.worker = data[0];
            console.log(_this.worker);
        })
            .catch(function (error) {
        });
        this.loader = true;
        this.workerService.getAllWorkers()
            .then(function (data) {
            _this.workers = data;
            _this.setPage(1);
            _this.loader = false;
        });
        this.hotelService.getHotels()
            .then(function (data2) {
            _this.hotels = data2;
            _this.dropdown_hotels = data2;
            _this.dropdown_hotels.unshift({ id: 'none', name: 'Please Select Hotel' });
            _this.workers_hotel = _this.dropdown_hotels[0].id;
            _this.loader = false;
        });
    }
    AdminWorkers.prototype.search_worker = function () {
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
    AdminWorkers.prototype.extractData = function (res) {
        this.empty_file = '';
        console.log(res);
        var lines = res.split("\n");
        var result = [];
        var headers = ["name", "email", "department", "status"];
        this.emails = [];
        for (var i = 0; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            if (obj['name'] && obj['email'] && obj['department'] && obj['status']) {
                result.push(obj);
            }
        }
        this.csvData = result; //JavaScript object
        console.log(this.csvData);
        /*if(headers){
          if(headers[0]!='name' || headers[1]!='email' || headers[2]!='department' || headers[3]!='status'){
            this.empty_file = "CSV must include headers i.e., name, email, department and status";
          }
          else{
            this.empty_file ='';
          }
        }*/
        for (var i = 0; i < this.csvData.length; i++) {
            if ((!this.csvData[i].email) || (this.csvData[i].email == "")) {
                this.empty_file = "Email is required in CSV.";
            }
            this.emails.push(this.csvData[i].email);
            console.log(this.csvData[i].email);
        }
        for (var i = 0; i < this.csvData.length; i++) {
            if (!this.csvData[i].status) {
                this.empty_file = "Status is required and can be 0 or 1 (inactive or active).";
            }
            //this.emails.push(this.csvData[i].email);
        }
        for (var i = 0; i <= this.emails.length; i++) {
            for (var j = i; j <= this.emails.length; j++) {
                if (i != j && this.emails[i] == this.emails[j]) {
                    this.empty_file = "CSV contains duplicate emails";
                }
            }
        }
    };
    AdminWorkers.prototype.handleHotelSelect = function () {
        if (this.empty_file) {
            this.empty_file = this.empty_file;
        }
        else if (this.workers_hotel == 'none') {
            this.hotel_error = "Please select hotel";
        }
        else {
            this.hotel_error = "";
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
            else if (_this.csvData) {
                _this.workerService.bulkEmp(_this.csvData, _this.workers_hotel.id, _this.workers_hotel.slug)
                    .then(function (data1) {
                    _this.workerService.getAllWorkers()
                        .then(function (data2) {
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
            else {
                _this.errorMessage = 'Please add employees data to upload!';
                _this.loader = false;
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
            .then(function (data1) {
            _this.workerService.getAllWorkers()
                .then(function (data) {
                _this.workers = data;
                _this.setPage(1);
                _this.loader = false;
            });
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
            _this.workerId = [];
            _this.workerService.getAllWorkers()
                .then(function (data) {
                _this.deleteMessage = '';
                _this.workers = data;
                _this.setPage(1);
                _this.loader = false;
            }); // close refresh
        })
            .catch(function (error) {
            _this.deleteMessage = 'Error while deleting record. Please try again!';
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
        this.workerService.updateWorkerInfo(this.worker.name, this.worker.email, this.worker.id, this.worker.department, this.worker.status, this.worker.login_type)
            .then(function (result) {
            _this.workerService.getAllWorkers()
                .then(function (data) {
                _this.workers = data;
                _this.setPage(1);
                $('#updateEmpModal').modal('hide');
                _this.loader = false;
            });
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AdminWorkers.prototype.resend_account_link = function () {
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
            this.workerService.postWorker(this.name, this.email, this.hotel_id, this.login_type, this.dept_selected, this.hotel_data.slug)
                .then(function (data2) {
                // refresh pending worker list for display
                _this.workerService.getAllWorkers()
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
                _this.validEmail = 'Sorry! User already exist with this email.';
                _this.loader = false;
            }); // end post
        }
    };
    AdminWorkers.prototype.downloadCSV = function () {
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
    AdminWorkers.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.workers.length, page);
        // get current page of items
        this.pagedItems = this.workers.slice(this.pager.startIndex, this.pager.endIndex + 1);
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