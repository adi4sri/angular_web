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
        this.workersService.getReviewsGraph(this.user.hotel_id)
            .then(function (data) {
            _this.barChartData = [
                { data: data }
            ];
            console.log(_this.barChartData);
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
            console.log('REVIEWS', _this.reviews);
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
    FeedbackComponent.prototype.downloadCSV = function () {
        var options = {
            showLabels: true
        };
        this.csv = this.reviews;
        new angular2_csv_1.Angular2Csv(this.csv, 'Reviews', options);
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