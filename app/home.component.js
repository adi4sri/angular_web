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
var hotels_service_1 = require("./providers/hotels.service");
var tips_service_1 = require("./providers/tips.service");
var workers_service_1 = require("./providers/workers.service");
var router_1 = require("@angular/router");
var HomeComponent = (function () {
    function HomeComponent(auth, tipsService, hotelsService, workersService, router) {
        var _this = this;
        this.auth = auth;
        this.tipsService = tipsService;
        this.hotelsService = hotelsService;
        this.workersService = workersService;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.houseData = [];
        this.bellhops = [];
        this.concierge = [];
        this.lineChartMonthlyData = [];
        this.lineChartWeeklyData = [];
        this.lineChartWeeklyLabels = [];
        this.lineChartYearlyData = [];
        this.lineChartYearlyLabels = [];
        this.lineChartDailyData = [];
        this.lineChartDailyLabels = [];
        this.loader = false;
        this.loading = 'Loading...';
        this.is_review = false;
        this.lineChartMonthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        //public lineChartWeeklyLabels:Array<any> = this.weeks;
        this.lineChartMonthlyOptions = {
            responsive: true,
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                }
            }
        };
        this.lineChartWeeklyOptions = {
            responsive: true,
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                }
            }
        };
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                }
            }
        };
        this.barChartDailyColors = [
            {
                backgroundColor: 'transparent',
                borderColor: '#65b4ff',
                pointBackgroundColor: 'transparent',
                pointBorderColor: '#65b4ff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                borderWidth: 3
            },
            {
                backgroundColor: 'transparent',
                borderColor: '#ac00ff',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)',
                borderWidth: 3
            },
            {
                backgroundColor: 'transparent',
                borderColor: '#a4a2a0',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                borderWidth: 3
            }
        ];
        this.lineChartMonthlyColors = [
            {
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#65b4ff',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#ac00ff',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#a4a2a0',
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartMonthlyLegend = true;
        this.lineChartMonthlyType = 'line';
        if (this.user && this.user.user_type == 'admin') {
            this.router.navigate(['/hotels']);
        }
        console.log(this.user);
        this.loader = true;
        this.tipsService.top_tipped_emp(this.user.hotel_id)
            .then(function (data) {
            _this.topped_emp = data;
            if (_this.topped_emp && _this.topped_emp[0]) {
                switch (_this.topped_emp[0].month) {
                    case 1:
                        _this.period = 'Jan';
                        break;
                    case 2:
                        _this.period = 'Feb';
                        break;
                    case 3:
                        _this.period = 'Mar';
                        break;
                    case 4:
                        _this.period = 'Apr';
                        break;
                    case 5:
                        _this.period = 'May';
                        break;
                    case 6:
                        _this.period = 'Jun';
                        break;
                    case 7:
                        _this.period = 'Jul';
                        break;
                    case 8:
                        _this.period = 'Aug';
                        break;
                    case 9:
                        _this.period = 'Sep';
                        break;
                    case 10:
                        _this.period = 'Oct';
                        break;
                    case 11:
                        _this.period = 'Nov';
                        break;
                    case 12:
                        _this.period = 'Dec';
                        break;
                    default:
                        _this.period = 'this month';
                        break;
                }
            }
            else {
                _this.period = 'this month';
            }
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
        this.workersService.getMonthlyReviews(this.user.hotel_id)
            .then(function (data) {
            _this.reviews = data;
            if (_this.reviews && _this.reviews.message) {
                _this.review_period = 'this month';
                _this.is_review = true;
            }
            else {
                _this.is_review = false;
            }
            if (_this.reviews && _this.reviews[0]) {
                switch (_this.reviews[0].month) {
                    case 1:
                        _this.review_period = 'Jan';
                        break;
                    case 2:
                        _this.review_period = 'Feb';
                        break;
                    case 3:
                        _this.review_period = 'Mar';
                        break;
                    case 4:
                        _this.review_period = 'Apr';
                        break;
                    case 5:
                        _this.review_period = 'May';
                        break;
                    case 6:
                        _this.review_period = 'Jun';
                        break;
                    case 7:
                        _this.review_period = 'Jul';
                        break;
                    case 8:
                        _this.review_period = 'Aug';
                        break;
                    case 9:
                        _this.review_period = 'Sep';
                        break;
                    case 10:
                        _this.review_period = 'Oct';
                        break;
                    case 11:
                        _this.review_period = 'Nov';
                        break;
                    case 12:
                        _this.review_period = 'Dec';
                        break;
                    default:
                        _this.review_period = 'this month';
                        break;
                }
            }
            else {
                _this.review_period = 'this month';
            }
        })
            .catch(function (error) {
            console.log(error);
        });
        //houseData=[];
        this.tipsService.chart()
            .then(function (data) {
            _this.tipData = data;
        });
        if (this.user.login_type == '0') {
            this.tipsService.dashboard(this.user.hotel_id)
                .then(function (data2) {
                _this.tips = data2;
                _this.show = true;
            });
            this.tipsService.monthly_chart_data(this.user.hotel_id)
                .then(function (data1) {
                _this.chart_data = data1;
                for (var key in _this.chart_data) {
                    var data2 = {
                        data: _this.chart_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartMonthlyData.push(data2);
                }
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.weekly_chart_data(this.user.hotel_id)
                .then(function (data1) {
                _this.weeks = [];
                _this.week_data = data1;
                for (var key in _this.week_data) {
                    var data2 = {
                        data: _this.week_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartWeeklyData.push(data2);
                }
                for (var j = 0; j <= 6; j++) {
                    switch (j) {
                        case 0:
                            _this.weeks.push('Sunday');
                            break;
                        case 1:
                            _this.weeks.push('Monday');
                            break;
                        case 2:
                            _this.weeks.push('Tuesday');
                            break;
                        case 3:
                            _this.weeks.push('Wednesday');
                            break;
                        case 4:
                            _this.weeks.push('Thurday');
                            break;
                        case 5:
                            _this.weeks.push('Friday');
                            break;
                        case 6:
                            _this.weeks.push('Saturday');
                            break;
                    }
                }
                _this.lineChartWeeklyLabels = _this.weeks;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.yearly_chart_data(this.user.hotel_id)
                .then(function (data1) {
                _this.years = [];
                _this.year_data = data1;
                for (var key in _this.year_data) {
                    var data2 = {
                        data: _this.year_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartYearlyData.push(data2);
                }
                var d = new Date();
                var n = d.getFullYear();
                for (var j = 2012; j <= n; j++) {
                    _this.years.push(j);
                }
                _this.lineChartYearlyLabels = _this.years;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.daily_chart_data(this.user.hotel_id)
                .then(function (data1) {
                _this.days = [];
                _this.day_data = data1;
                for (var key in _this.day_data) {
                    var data2 = {
                        data: _this.day_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartDailyData.push(data2);
                }
                _this.lineChartDailyLabels = ['Today'];
            })
                .catch(function (error) {
                console.log(error);
            });
        }
        if (this.user.login_type == '1') {
            this.tipsService.workerTipsComparison(this.user.id)
                .then(function (data) {
                _this.show = true;
                _this.tips = data;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.emp_monthly_chart(this.user.id)
                .then(function (data) {
                _this.chart_data = data;
                for (var key in _this.chart_data) {
                    var data2 = {
                        data: _this.chart_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartMonthlyData.push(data2);
                }
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.emp_weekly_chart(this.user.id)
                .then(function (data1) {
                _this.weeks = [];
                _this.week_data = data1;
                for (var key in _this.week_data) {
                    var data2 = {
                        data: _this.week_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartWeeklyData.push(data2);
                }
                for (var j = 0; j <= 6; j++) {
                    switch (j) {
                        case 0:
                            _this.weeks.push('Sunday');
                            break;
                        case 1:
                            _this.weeks.push('Monday');
                            break;
                        case 2:
                            _this.weeks.push('Tuesday');
                            break;
                        case 3:
                            _this.weeks.push('Wednesday');
                            break;
                        case 4:
                            _this.weeks.push('Thurday');
                            break;
                        case 5:
                            _this.weeks.push('Friday');
                            break;
                        case 6:
                            _this.weeks.push('Saturday');
                            break;
                    }
                }
                _this.lineChartWeeklyLabels = _this.weeks;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.emp_yearly_chart(this.user.id)
                .then(function (data1) {
                _this.years = [];
                _this.year_data = data1;
                for (var key in _this.year_data) {
                    var data2 = {
                        data: _this.year_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartYearlyData.push(data2);
                }
                var d = new Date();
                var n = d.getFullYear();
                for (var j = 2012; j <= n; j++) {
                    _this.years.push(j);
                }
                _this.lineChartYearlyLabels = _this.years;
            })
                .catch(function (error) {
                console.log(error);
            });
            this.tipsService.emp_daily_chart(this.user.id)
                .then(function (data1) {
                _this.days = [];
                _this.day_data = data1;
                for (var key in _this.day_data) {
                    var data2 = {
                        data: _this.day_data[key],
                        label: key,
                        tension: 0
                    };
                    _this.lineChartDailyData.push(data2);
                }
                _this.lineChartDailyLabels = ['Today'];
            })
                .catch(function (error) {
                console.log(error);
            });
        }
    }
    HomeComponent.prototype.top_review_daily = function () {
        var _this = this;
        this.loader = true;
        this.workersService.getDailyReviews(this.user.hotel_id)
            .then(function (data) {
            if (data && data.message) {
                _this.review_period = 'this day';
                _this.is_review = true;
            }
            else {
                _this.is_review = false;
                _this.reviews = data;
            }
            _this.review_period = 'this day';
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.top_review_weekly = function () {
        var _this = this;
        this.loader = true;
        this.workersService.getWeeklyReviews(this.user.hotel_id)
            .then(function (data) {
            _this.reviews = data;
            if (_this.reviews && _this.reviews.message) {
                _this.is_review = true;
                _this.review_period = 'this week';
            }
            else {
                _this.is_review = false;
            }
            _this.review_period = 'this week';
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.top_review_monthly = function () {
        var _this = this;
        this.loader = true;
        this.workersService.getMonthlyReviews(this.user.hotel_id)
            .then(function (data) {
            _this.reviews = data;
            if (_this.reviews && _this.reviews.message) {
                _this.review_period = 'this month';
                _this.is_review = true;
            }
            else {
                _this.is_review = false;
            }
            if (_this.reviews && _this.reviews[0]) {
                switch (_this.reviews[0].month) {
                    case 1:
                        _this.review_period = 'Jan';
                        break;
                    case 2:
                        _this.review_period = 'Feb';
                        break;
                    case 3:
                        _this.review_period = 'Mar';
                        break;
                    case 4:
                        _this.review_period = 'Apr';
                        break;
                    case 5:
                        _this.review_period = 'May';
                        break;
                    case 6:
                        _this.review_period = 'Jun';
                        break;
                    case 7:
                        _this.review_period = 'Jul';
                        break;
                    case 8:
                        _this.review_period = 'Aug';
                        break;
                    case 9:
                        _this.review_period = 'Sep';
                        break;
                    case 10:
                        _this.review_period = 'Oct';
                        break;
                    case 11:
                        _this.review_period = 'Nov';
                        break;
                    case 12:
                        _this.review_period = 'Dec';
                        break;
                    default:
                        _this.review_period = 'this month';
                        break;
                }
            }
            else {
                _this.review_period = 'this month';
            }
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
            _this.loader = false;
        });
    };
    HomeComponent.prototype.top_review_yearly = function () {
        var _this = this;
        this.loader = true;
        this.workersService.getYearlyReviews(this.user.hotel_id)
            .then(function (data) {
            _this.reviews = data;
            if (data && data.message) {
                _this.review_period = 'this year';
                _this.is_review = true;
            }
            else {
                if (_this.reviews && _this.reviews[0]) {
                    _this.review_period = _this.reviews[0].year;
                }
                else {
                    _this.review_period = 'this year';
                }
            }
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.top_tipped_yearly = function () {
        var _this = this;
        this.loader = true;
        this.tipsService.yearly_top_tipped(this.user.hotel_id)
            .then(function (data) {
            _this.topped_emp = data;
            _this.period = '';
            if (_this.topped_emp && _this.topped_emp[0]) {
                _this.period = _this.topped_emp[0].year;
            }
            else {
                _this.period = 'this year';
            }
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.top_tipped_monthly = function () {
        var _this = this;
        this.loader = true;
        this.tipsService.top_tipped_emp(this.user.hotel_id)
            .then(function (data) {
            _this.topped_emp = data;
            if (_this.topped_emp && _this.topped_emp[0]) {
                switch (_this.topped_emp[0].month) {
                    case 1:
                        _this.period = 'Jan';
                        break;
                    case 2:
                        _this.period = 'Feb';
                        break;
                    case 3:
                        _this.period = 'Mar';
                        break;
                    case 4:
                        _this.period = 'Apr';
                        break;
                    case 5:
                        _this.period = 'May';
                        break;
                    case 6:
                        _this.period = 'Jun';
                        break;
                    case 7:
                        _this.period = 'Jul';
                        break;
                    case 8:
                        _this.period = 'Aug';
                        break;
                    case 9:
                        _this.period = 'Sep';
                        break;
                    case 10:
                        _this.period = 'Oct';
                        break;
                    case 11:
                        _this.period = 'Nov';
                        break;
                    case 12:
                        _this.period = 'Dec';
                        break;
                    default:
                        _this.period = 'this month';
                        break;
                }
            }
            else {
                _this.period = 'this month';
            }
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.top_tipped_weekly = function () {
        var _this = this;
        this.loader = true;
        this.tipsService.weekly_top_tipped(this.user.hotel_id)
            .then(function (data) {
            _this.topped_emp = data;
            _this.period = 'this week';
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomeComponent.prototype.top_tipped_daily = function () {
        var _this = this;
        this.loader = true;
        this.tipsService.daily_top_tipped(this.user.hotel_id)
            .then(function (data) {
            _this.topped_emp = data;
            _this.period = 'this day';
            _this.loader = false;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    // events
    HomeComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    HomeComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: 'app/home.template.html',
            providers: [tips_service_1.TipsService, auth_service_1.Auth]
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, tips_service_1.TipsService, hotels_service_1.HotelsService, workers_service_1.WorkersService, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
;
//# sourceMappingURL=home.component.js.map