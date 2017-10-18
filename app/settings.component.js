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
var hotels_service_1 = require("./providers/hotels.service");
var router_1 = require("@angular/router");
var SettingsComponent = (function () {
    function SettingsComponent(auth, http, authHttp, workersService, hotelsService, router) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.workersService = workersService;
        this.hotelsService = hotelsService;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
        this.view_hotel_mode = JSON.parse(localStorage.getItem('view_hotel'));
        this.compare_pass = true;
        this.departments = [];
        this.dept_name = [];
        this.loader = false;
        this.dept_loader = false;
        this.role_loader = false;
        this.bank_success = false;
        this.bank_remove_success = false;
        this.errors = [{
                message: ''
            }];
        this.show_bank_update = false;
        this.show_set_default = false;
        console.log(this.user);
        this.loader = true;
        this.id = this.user.id;
        this.worker = [];
        this.workersService.workerDetails(this.id)
            .then(function (data) {
            _this.worker = data[0];
            _this.departments = _this.worker.hotel_department;
            if (_this.departments == null) {
                _this.departments = [""];
            }
            _this.loader = false;
        })
            .catch(function (error) {
        });
        /*this.user_type = this.user.user_roles.user_type;
        this.workersService.getRoles(this.user_type)
            .then(data=>{
                this.role = data[0];
                localStorage.setItem("roles",JSON.stringify(data[0]));
                this.roles=JSON.parse(localStorage.getItem('roles'));
                console.log('Roles',this.roles);
                })
            .catch(error=>{
                console.log(error);
                });*/
        this.workersService.getBankInfo(this.user.id)
            .then(function (data) {
            console.log(data);
            if (data && data['funding-sources']) {
                _this.bankInfo = data['funding-sources'];
                /*this.bankInfo.bankAccountType = data['funding-sources'][0].bankAccountType;
                this.bankInfo.bankName = data['funding-sources'][0].bankName;*/
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    SettingsComponent.prototype.getBankInfo = function () {
        var _this = this;
        this.workersService.getBankInfo(this.user.id)
            .then(function (data) {
            if (data && data['funding-sources']) {
                _this.bankInfo = data['funding-sources'];
            }
            console.log(_this.bankInfo);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SettingsComponent.prototype.submitBankInfo = function () {
        var _this = this;
        this.loader = true;
        if (!this.name || !this.routingNumber || !this.accountNumber || !this.bankAccountType) {
            this.errorMessage2 = 'Please fill all the fields!';
            this.loader = false;
        }
        else {
            this.errorMessage = '';
            this.workersService.bankInfo(this.user.id, this.routingNumber, this.accountNumber, this.bankAccountType, this.name, this.user.hotel_slug)
                .then(function (data) {
                console.log(data);
                _this.workersService.getBankInfo(_this.user.id)
                    .then(function (data1) {
                    console.log(data1);
                    if (data1 && data1['funding-sources'] && data1['funding-sources'].length == 1) {
                        _this.user.default_funding_source = data.body.id;
                        localStorage.setItem("admin", JSON.stringify(_this.user));
                    }
                    _this.loader = true;
                    _this.workersService.getBankInfo(_this.user.id)
                        .then(function (data) {
                        if (data && data['funding-sources']) {
                            _this.bankInfo = data['funding-sources'];
                        }
                        console.log(_this.bankInfo);
                        _this.loader = false;
                    })
                        .catch(function (error) {
                        _this.loader = false;
                        console.log(error);
                    });
                })
                    .catch(function (error1) {
                    console.log(error1);
                });
                $('#add_bank').modal('hide');
                _this.name = '';
                _this.routingNumber = '';
                _this.accountNumber = '';
                _this.bankAccountType = '';
                _this.loader = false;
                setTimeout(function () {
                    document.getElementById("errorMessage").style.display = 'none';
                    document.getElementById("errorMessage2").style.display = 'none';
                }, 3000);
            })
                .catch(function (error) {
                _this.errorMessage = JSON.parse(error._body);
                _this.errorMessage = (JSON.parse(_this.errorMessage.message));
                console.log(_this.errorMessage);
                if (_this.errorMessage && _this.errorMessage.message && _this.errorMessage._embedded && _this.errorMessage._embedded.errors) {
                    _this.errors = _this.errorMessage._embedded.errors;
                    _this.loader = false;
                }
                _this.loader = false;
            });
        }
    };
    SettingsComponent.prototype.showBankUpdate = function (bank) {
        console.log(bank);
        this.bankDetails = bank;
        this.show_bank_update = true;
    };
    SettingsComponent.prototype.showSetDefault = function (bank) {
        console.log(bank);
        this.bankDetails = bank;
        this.show_set_default = true;
    };
    SettingsComponent.prototype.updateBank = function () {
        var _this = this;
        this.loader = true;
        this.workersService.updateBankInfo(this.user.id, this.bankDetails.bankAccountType, this.bankDetails.name, this.bankDetails.id)
            .then(function (data) {
            console.log(data);
            _this.show_bank_update = false;
            _this.loader = false;
            _this.bank_success = true;
            $('#update_bank').modal('hide');
            setTimeout(function () {
                document.getElementById("bank_success").style.display = 'none';
            }, 3000);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SettingsComponent.prototype.deleteBank = function () {
        var _this = this;
        this.loader = true;
        this.workersService.deleteBankInfo(this.user.id, this.bankDetails.id)
            .then(function (data) {
            console.log(data);
            _this.workersService.getBankInfo(_this.user.id)
                .then(function (data) {
                var bank_id = JSON.parse(localStorage.getItem('admin'));
                if (_this.bankDetails.id == bank_id.default_funding_source) {
                    bank_id.default_funding_source = '';
                    _this.user.default_funding_source = '';
                    bank_id = JSON.stringify(bank_id);
                    localStorage.setItem('admin', bank_id);
                }
                _this.loader = false;
                $('#update_bank').modal('hide');
                if (data && data['funding-sources']) {
                    _this.bankInfo = data['funding-sources'];
                    _this.bank_remove_success = true;
                    setTimeout(function () {
                        document.getElementById("bank_remove_success").style.display = 'none';
                    }, 3000);
                    if (!data['funding-sources'][0] && _this.user.login_type == '1') {
                        //alert('You don\'t have a bank account linked with bTIPt. Please add bank to make transactions')
                        _this.router.navigate(["/bank-info"]);
                        setTimeout(function () {
                            window.location.reload();
                        }, 100);
                    }
                }
            })
                .catch(function (error) {
                console.log(error);
                _this.loader = false;
            });
        })
            .catch(function (error) {
            console.log(error);
            _this.loader = false;
        });
    };
    SettingsComponent.prototype.setDefaultBank = function () {
        var _this = this;
        this.loader = true;
        this.workersService.setDefaultBank(this.user.id, this.bankDetails.id)
            .then(function (data) {
            console.log(data);
            _this.getBankInfo();
            _this.user.default_funding_source = _this.bankDetails.id;
            localStorage.setItem("admin", JSON.stringify(_this.user));
            _this.show_set_default = false;
            $('#set_default_bank').modal('hide');
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    SettingsComponent.prototype.updateRoles = function () {
        var _this = this;
        this.loader = true;
        this.user_type = this.user.user_type;
        console.log(this.user_type);
        //this.login_type = this.user.login_type;
        this.workersService.workerRoles(this.role.dashboard, this.role.worker_employees, this.role.tip_comparison, this.role.tip_employee, this.role.reviews, this.user_type, '1', this.user.hotel_id)
            .then(function (data) {
            console.log(_this.role.login_type);
            _this.role_success = 'Roles updated successfully';
            _this.loader = false;
        })
            .catch(function (error) {
            _this.errorRole = JSON.parse(error._body);
            _this.loader = false;
        });
        this.newRole = {};
        this.newRole.dashboard = this.role.dashboard;
        this.newRole.worker_employees = this.role.worker_employees;
        this.newRole.tip_comparison = this.role.tip_comparison;
        this.newRole.tip_employee = this.role.tip_employee;
        this.newRole.reviews = this.role.reviews;
        this.newRole.user_type = this.user_type;
        this.newRole.setting = true;
        localStorage.setItem("user_roles2", JSON.stringify(this.newRole));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
    };
    SettingsComponent.prototype.updatePassword = function () {
        var _this = this;
        this.loader = true;
        this.id = this.user.id;
        if (this.new_pass == this.renew_pass) {
            this.compare_pass = true;
            this.workersService.updateWorkerPassword(this.id, this.current_pass, this.renew_pass)
                .then(function (data) {
                console.log('Password Changed');
                _this.success = true;
                _this.current_pass = '';
                _this.new_pass = '';
                _this.renew_pass = '';
                _this.loader = false;
            })
                .catch(function (error) {
                _this.errorMessage = JSON.parse(error._body);
                console.log(_this.errorMessage.message);
                _this.loader = false;
            });
        }
        else {
            this.compare_pass = false;
            this.loader = false;
            console.log('Passwords should be matched!');
        }
    };
    SettingsComponent.prototype.trackByFn = function (index, item) {
        return index;
    };
    SettingsComponent.prototype.addNewDept = function () {
        this.departments.push('');
        console.log(this.departments);
    };
    SettingsComponent.prototype.removeDept = function (index) {
        this.departments.splice(index, 1);
        console.log(this.departments);
    };
    SettingsComponent.prototype.addDepartments = function () {
        var _this = this;
        this.id = this.user.hotel_id;
        this.dept_loader = true;
        this.hotelsService.addDepartments(this.id, this.departments)
            .then(function (data) {
            _this.dept_success = 'Departments Updated';
            document.getElementById("dept_success").style.display = '';
            _this.dept_loader = false;
            setTimeout(function () {
                this.dept_success = '';
                document.getElementById("dept_success").style.display = 'none';
            }, 3000);
        })
            .catch(function (error) {
            _this.errorMessage = JSON.parse(error._body);
            console.log(_this.errorMessage.message);
            _this.dept_loader = false;
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings',
            templateUrl: 'app/settings.component.html',
            providers: [auth_service_1.Auth, workers_service_1.WorkersService, hotels_service_1.HotelsService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            angular2_jwt_1.AuthHttp,
            workers_service_1.WorkersService,
            hotels_service_1.HotelsService,
            router_1.Router])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
;
//# sourceMappingURL=settings.component.js.map