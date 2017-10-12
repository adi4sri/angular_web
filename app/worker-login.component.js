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
var router_1 = require("@angular/router");
var workers_service_1 = require("./providers/workers.service");
require("rxjs/add/operator/map");
var WorkerLoginComponent = (function () {
    function WorkerLoginComponent(auth, http, authHttp, router, workersService) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.router = router;
        this.workersService = workersService;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.user_role = JSON.parse(localStorage.getItem('user_roles2'));
        this.loader = false;
        /*if(auth.authenticated()){
          if(this.user.login_type=='0'){
              this.router.navigate(["/home"]);
            }
           else if (this.user.login_type=='1'){
             this.router.navigate(["/settings"]);
           }
          }   */
        if (auth.authenticated()) {
            this.workersService.getBankInfo(this.user.id)
                .then(function (data1) {
                console.log(data1);
                if ((data1['funding-sources'][0] && _this.user.login_type == '1' && _this.user.user_roles_worker.dashboard == true) || _this.user.login_type == '0') {
                    _this.router.navigate(["/home"]);
                    console.log('Login', JSON.parse(localStorage.getItem("admin")));
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else if (_this.user.user_roles_worker.tip_employee == true && _this.user.login_type == '1' && data1['funding-sources'][0]) {
                    _this.router.navigate(["/employee_tips"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else if (_this.user.user_roles_worker.tip_comparison == true && _this.user.login_type == '1' && data1['funding-sources'][0]) {
                    _this.router.navigate(["/tip_comparison"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else if (!data1['funding-sources'][0]) {
                    _this.router.navigate(["/bank-info"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else {
                    _this.router.navigate(["/settings"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                //setTimeout(function(){ window.location.reload(); }, 100);
                _this.loader = false;
            })
                .catch(function (error) {
                console.log(error);
                //  window.location.reload();    
                _this.loader = false;
            });
        }
    }
    WorkerLoginComponent.prototype.loginUser = function () {
        var _this = this;
        this.loader = true;
        var path = window.location.host;
        var parts = path.split('.');
        var sub_domain = parts[0];
        this.auth.workerLogin(this.email, this.password, 'worker', sub_domain)
            .then(function (data) {
            console.log('UserData', data);
            data.user_type = 'worker';
            localStorage.setItem("admin", JSON.stringify(data));
            localStorage.setItem("user_roles1", JSON.stringify(data.user_roles_manager));
            localStorage.setItem("user_roles2", JSON.stringify(data.user_roles_worker));
            _this.workersService.getBankInfo(data.id)
                .then(function (data1) {
                console.log(data1);
                if ((data1['funding-sources'][0] && data.login_type == '1' && data.user_roles_worker.dashboard == true) || data.login_type == '0') {
                    _this.router.navigate(["/home"]);
                    console.log('Login', JSON.parse(localStorage.getItem("admin")));
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else if (data.user_roles_worker.tip_employee == true && data.login_type == '1' && data1['funding-sources'][0]) {
                    _this.router.navigate(["/employee_tips"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else if (data.user_roles_worker.tip_comparison == true && data.login_type == '1' && data1['funding-sources'][0]) {
                    _this.router.navigate(["/tip_comparison"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else if (!data1['funding-sources'][0]) {
                    _this.router.navigate(["/bank-info"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                else {
                    _this.router.navigate(["/settings"]);
                    setTimeout(function () {
                        window.location.reload();
                    }, 100);
                }
                //setTimeout(function(){ window.location.reload(); }, 100);
                _this.loader = false;
            })
                .catch(function (error) {
                console.log(error);
                //  window.location.reload();    
                _this.loader = false;
            });
        })
            .catch(function (error) {
            _this.errorMessage = JSON.parse(error._body);
            console.log('LOG', _this.errorMessage.message);
            _this.loader = false;
            //window.location.reload();  
        }); // end post
    };
    WorkerLoginComponent.prototype.forgotPassword = function () {
        this.router.navigate(["/forgot-password"]);
    };
    WorkerLoginComponent = __decorate([
        core_1.Component({
            selector: 'worker-login',
            templateUrl: 'app/worker-login.component.html',
            providers: [auth_service_1.Auth]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http, angular2_jwt_1.AuthHttp, router_1.Router, workers_service_1.WorkersService])
    ], WorkerLoginComponent);
    return WorkerLoginComponent;
}());
exports.WorkerLoginComponent = WorkerLoginComponent;
;
//# sourceMappingURL=worker-login.component.js.map