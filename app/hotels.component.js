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
var tips_service_1 = require("./providers/tips.service");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
var angular2_csv_1 = require("angular2-csv");
var hotels_service_1 = require("./providers/hotels.service");
var workers_service_1 = require("./providers/workers.service");
var pager_service_1 = require("./pager-service");
var HotelsPage = (function () {
    function HotelsPage(auth, http, authHttp, hotelService, tipsService, pagerService, workersService, router) {
        var _this = this;
        this.auth = auth;
        this.http = http;
        this.authHttp = authHttp;
        this.hotelService = hotelService;
        this.tipsService = tipsService;
        this.pagerService = pagerService;
        this.workersService = workersService;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
        this.API_URL = 'http://13.59.184.105:9000';
        this.selectAll = false;
        this.hotelId = [];
        this.isCheckedAll = false;
        this.worker_count = [];
        this.loader = false;
        this.pager = {};
        this.hideLoc = false;
        this.loader = true;
        this.hotelForm = false;
        this.hotelService.getHotels()
            .then(function (data2) {
            _this.hotels = data2;
            _this.setPage(1);
            _this.loader = false;
        });
        /*this.tipsService.dashboard(this.user.hotel_id)
        .then((data2:any) => {
          this.tips = data2;
          this.loader = false;
        });*/
        this.tipsService.getAllTips()
            .then(function (data2) {
            _this.tippers = data2;
            _this.loader = false;
            var total = 0;
            for (var i = 0; i < _this.tippers.length; i++) {
                if (_this.tippers[i].amount) {
                    total += parseFloat(_this.tippers[i].amount);
                    _this.totalamount = total;
                }
            }
        });
        this.workersService.getAllWorkers()
            .then(function (data2) {
            _this.workers = data2;
            _this.loader = false;
            for (var i = 0; i < _this.workers.length; i++) {
                _this.worker_count.push(_this.workers[i].hotel_id);
            }
            _this.worker_count.sort();
        });
    }
    HotelsPage.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.hotels.length, page);
        // get current page of items
        this.pagedItems = this.hotels.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    HotelsPage.prototype.next = function () {
        if (!this.hotelName || !this.hotelCity || !this.hotelAddress || !this.hotelZip || !this.hotelEmail || !this.hotelSubDomain) {
            this.errorMessage = 'Please fill all the fields correctly';
        }
        else {
            this.hideLoc = true;
        }
    };
    HotelsPage.prototype.back = function () {
        this.hideLoc = false;
    };
    HotelsPage.prototype.updateHotelStatus = function (hotelId, status) {
        var _this = this;
        this.loader = true;
        this.hotelService.updateHotels(hotelId, status)
            .then(function (data) {
            _this.loader = false;
        });
    };
    HotelsPage.prototype.view_hotel = function (hotel_id, hotel_email) {
        var _this = this;
        if (hotel_id && hotel_email) {
            this.loader = true;
            this.shadow = this.user;
            localStorage.setItem("shadow", JSON.stringify(this.shadow));
            localStorage.setItem("shadow_roles1", JSON.stringify(this.shadow.user_roles_super));
            localStorage.setItem("shadow_roles2", JSON.stringify(this.shadow.user_roles_admin));
            this.auth.workerShadowLogin(hotel_email, "worker")
                .then(function (data) {
                _this.v_data = data;
                _this.v_data.hotel_id = hotel_id;
                _this.v_data.user_type = "worker";
                localStorage.setItem("admin", JSON.stringify(_this.v_data));
                localStorage.setItem("user_roles1", JSON.stringify(_this.v_data.user_roles_manager));
                localStorage.setItem("user_roles2", JSON.stringify(_this.v_data.user_roles_worker));
                _this.view_mode = true;
                localStorage.setItem("view_hotel", JSON.stringify(_this.view_mode));
                _this.router.navigate(['/home']);
                setTimeout(function () { window.location.reload(); }, 100);
                _this.loader = false;
            })
                .catch(function (error) {
                console.log(error);
                if (error && error._body) {
                    var err = JSON.parse(error._body);
                    alert(err.message);
                    _this.loader = false;
                }
            });
            //window.location.reload();
        }
        else {
            console.log(hotel_email, hotel_id);
            this.loader = false;
        }
    };
    HotelsPage.prototype.selectId = function (value) {
        if (this.hotelId.includes(value)) {
            this.hotelId.splice(this.hotelId.indexOf(value), 1);
        }
        else {
            this.hotelId.push(value);
        }
    };
    HotelsPage.prototype.selectAllId = function () {
        this.hotelId = [];
        if (this.isCheckedAll) {
            this.hotelId = [];
        }
        else {
            this.hotelId = [];
            for (var i = 0; i < this.hotels.length; i++) {
                this.hotelId.push(this.hotels[i].id);
            }
        }
        this.isCheckedAll = !this.isCheckedAll;
    };
    HotelsPage.prototype.isChecked = function (value) {
        return this.hotelId.includes(value);
    };
    HotelsPage.prototype.deleteHotel = function () {
        var _this = this;
        this.loader = true;
        this.hotelService.deleteHotels(this.hotelId)
            .then(function (data) {
            _this.hotels = data;
            _this.hotelService.getHotels()
                .then(function (data2) {
                _this.hotels = data2;
                _this.setPage(1);
                _this.loader = false;
            }); // close refresh
        })
            .catch(function (error) {
            _this.loader = false;
        });
    };
    HotelsPage.prototype.showForm = function () {
        this.hotelForm = true;
    };
    HotelsPage.prototype.hideForm = function () {
        this.hotelForm = false;
    };
    HotelsPage.prototype.displayHotel = function (hotel) {
        // this.hotelForm = false;
    };
    //add worker to allowed workers list for signup - need to put in real hotel_id here
    HotelsPage.prototype.submitHotel = function () {
        var _this = this;
        this.loader = true;
        if (!this.hotelName || !this.hotelCity || !this.hotelAddress || !this.hotelZip || !this.hotelEmail || !this.hotelEmployee || !this.hotelSubDomain) {
            this.errorMessage = 'Please fill all the fields correctly';
            this.loader = false;
        }
        else {
            this.hotelService.postHotel(this.hotelName, this.hotelCity, this.hotelAddress, this.hotelZip, this.hotelEmail, this.hotelEmployee, this.hotelSubDomain)
                .then(function (data) {
                // refresh hotel list  
                _this.hotelService.getHotels()
                    .then(function (data2) {
                    _this.hotels = data2;
                    _this.setPage(1);
                    _this.loader = false;
                }); // close refresh
                _this.hotelForm = false;
                $('#addHotelModal').modal('hide');
                _this.hotelName = '';
                _this.hotelCity = '';
                _this.hotelAddress = '';
                _this.hotelZip = '';
                _this.hotelEmail = '';
                _this.hotelEmployee = '';
                _this.hideLoc = false;
            })
                .catch(function (error) {
                console.log(error);
                _this.errorMessage = JSON.parse(error._body);
                _this.errorMessage = _this.errorMessage.error;
                _this.loader = false;
            });
        }
    };
    HotelsPage.prototype.downloadCSV = function () {
        var options = {
            showLabels: true
        };
        var hotels = [];
        for (var i = 0; i < this.hotels.length; i++) {
            hotels.push({
                name: this.hotels[i].name,
                city: this.hotels[i].city,
                account_creation: this.hotels[i].account_creation,
                address: this.hotels[i].address,
                zip_code: this.hotels[i].zip_code,
                status: this.hotels[i].status == '0' ? 'Inactive' : 'Active',
                email: this.hotels[i].email,
                number_of_employees: this.hotels[i].count,
            });
        }
        new angular2_csv_1.Angular2Csv(hotels, 'Hotels', { headers: Object.keys(hotels[0]) });
    };
    HotelsPage = __decorate([
        core_1.Component({
            selector: 'ping',
            templateUrl: 'app/hotels.template.html',
            providers: [hotels_service_1.HotelsService, tips_service_1.TipsService, workers_service_1.WorkersService]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth,
            http_1.Http,
            angular2_jwt_1.AuthHttp,
            hotels_service_1.HotelsService,
            tips_service_1.TipsService, pager_service_1.PagerService,
            workers_service_1.WorkersService, router_1.Router])
    ], HotelsPage);
    return HotelsPage;
}());
exports.HotelsPage = HotelsPage;
;
//# sourceMappingURL=hotels.component.js.map