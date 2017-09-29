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
var workers_service_1 = require("./providers/workers.service");
var angular2_csv_1 = require("angular2-csv");
var FeedbackComponent = (function () {
    function FeedbackComponent(auth, workersService) {
        var _this = this;
        this.auth = auth;
        this.workersService = workersService;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.is_review = false;
        // barChart
        /*public barChartDataTable:Array<any> = [
          {data: this.barChartData}
        ];*/
        this.barChartLabels = ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];
        this.barChartOptions = {
            responsive: true,
            color: '#ffffff'
        };
        this.barChartColors = [
            {
                backgroundColor: '#85bb65',
                borderColor: 'blue',
                pointBackgroundColor: 'blue',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'purple',
                pointBackgroundColor: 'purple',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'red',
                pointBackgroundColor: 'red',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.barChartLegend = false;
        this.barChartType = 'horizontalBar';
        if (this.user.login_type == '0') {
            this.workersService.getReviewsGraph(this.user.hotel_id)
                .then(function (data) {
                _this.barChartData = [
                    { data: data }
                ];
            })
                .catch(function (error) {
                console.log(error);
            });
            this.workersService.getReviews(this.user.hotel_id)
                .then(function (data) {
                _this.reviews = data;
                if (_this.reviews && _this.reviews[0]) {
                    _this.is_review = false;
                }
                else if (_this.reviews.message) {
                    _this.is_review = true;
                }
            })
                .catch(function (error) {
                console.log(error);
            });
            this.workersService.getAllReviews(this.user.hotel_id)
                .then(function (data) {
                _this.all_reviews = data;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.workersService.getCountReviews(this.user.hotel_id)
                .then(function (data) {
                _this.count = parseInt(data[0].count);
                _this.average = parseInt(data[0].avg);
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        if (this.user.login_type == '1') {
            this.workersService.getReviewsEmpGraph(this.user.id)
                .then(function (data) {
                _this.barChartDataEmp = [
                    { data: data }
                ];
                console.log('e', data);
            })
                .catch(function (error) {
                console.log(error);
            });
            this.workersService.getAllEmpReviews(this.user.id)
                .then(function (data) {
                _this.all_reviews = data;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.workersService.getCountEmpReviews(this.user.id)
                .then(function (data) {
                _this.count = parseInt(data[0].count);
                _this.average = parseInt(data[0].avg);
            })
                .catch(function (error) {
                console.log(error);
            });
        }
    }
    FeedbackComponent.prototype.downloadCSV = function () {
        var csv = this.all_reviews;
        for (var i = 0; i < csv.length; i++) {
            delete csv[i].guest_id;
            delete csv[i].hotel_id;
            delete csv[i].tip_id;
            delete csv[i].worker_id;
            delete csv[i].id;
        }
        new angular2_csv_1.Angular2Csv(csv, 'Reviews', { headers: Object.keys(csv[0]) });
    };
    // events
    FeedbackComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    FeedbackComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    FeedbackComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/feedback.template.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, workers_service_1.WorkersService])
    ], FeedbackComponent);
    return FeedbackComponent;
}());
exports.FeedbackComponent = FeedbackComponent;
;
//# sourceMappingURL=feedback.component.js.map