"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MyFilterPipe = (function () {
    function MyFilterPipe() {
    }
    MyFilterPipe.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(function (item) {
            return item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        });
    };
    MyFilterPipe = __decorate([
        core_1.Pipe({
            name: 'myfilter',
            pure: false
        })
    ], MyFilterPipe);
    return MyFilterPipe;
}());
exports.MyFilterPipe = MyFilterPipe;
//# sourceMappingURL=my-filter.pipe.js.map