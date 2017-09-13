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
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('admin'));
        this.role = JSON.parse(localStorage.getItem('user_roles2'));
        this.view_hotel_mode = JSON.parse(localStorage.getItem('view_hotel'));
        this.navbar = false;
        console.log('mode', this.view_hotel_mode);
        console.log('user', this.user);
        var current_url = window.location.href;
        var str_sub = current_url.substr(current_url.lastIndexOf("/") + 1);
        if (str_sub == 'bank-info') {
            this.navbar = false;
        }
        else {
            this.navbar = true;
        }
        console.log('nav', str_sub);
    }
    AppComponent.prototype.logoutUser = function () {
        this.auth.logout();
        //this.router.navigate(["/login"]);
        this.router.navigate(["/login"]);
        localStorage.clearAll();
        //window.location.replace('/login');
    };
    AppComponent.prototype.view_admin = function () {
        this.v_data = this.user;
        this.v_data.user_type = "admin";
        this.v_data.hotel_id = null;
        localStorage.setItem("admin", JSON.stringify(this.v_data));
        this.view_mode = false;
        localStorage.setItem("view_hotel", JSON.stringify(this.view_mode));
        this.router.navigate(['/hotels']);
        setTimeout(function () { window.location.reload(); }, 100);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [auth_service_1.Auth],
            templateUrl: 'app/app.template.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.Auth, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;
//# sourceMappingURL=app.component.js.map