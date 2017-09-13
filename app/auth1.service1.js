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
var auth_config_1 = require("./auth.config");
var Auth = (function () {
    function Auth() {
        this.options = {
            theme: {
                logo: 'http://13.59.184.105:9000/logo',
                primaryColor: '#85BB65'
            },
            languageDictionary: {
                title: ""
            },
            initialScreen: 'signUp'
        };
        // Configure Auth0
        this.lock = new Auth0Lock(auth_config_1.myConfig.clientID, auth_config_1.myConfig.domain, this.options);
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('auth_id', authResult.idTokenPayload.sub.substring(6));
        });
    }
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        //this.lock.show();
    };
    ;
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // It searches for an item in localStorage with key == 'id_token'
        //return tokenNotExpired();
    };
    ;
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        //localStorage.removeItem('id_token');
    };
    ;
    Auth = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
;
//# sourceMappingURL=auth1.service1.js.map