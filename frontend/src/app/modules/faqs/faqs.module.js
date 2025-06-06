"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var faqs_component_1 = require("./faqs/faqs.component");
var routes = [
    {
        path: '',
        component: faqs_component_1.FaqsComponent
    },
    // Add more routes as needed
];
var FaqsModule = /** @class */ (function () {
    function FaqsModule() {
    }
    FaqsModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                faqs_component_1.FaqsComponent
            ],
            exports: [router_1.RouterModule]
        })
    ], FaqsModule);
    return FaqsModule;
}());
exports.FaqsModule = FaqsModule;
