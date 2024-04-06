"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var ApiService = /** @class */ (function () {
    function ApiService(httpClient) {
        this.httpClient = httpClient;
        this.url = "http://127.0.0.1:5000";
        this.getUrl = this.url + "/data";
        this.postUrl = this.url + "/ask";
    }
    // Used to make a GET request to the API
    ApiService.prototype.get = function (url, options) {
        return this.httpClient.get(url, options);
    };
    // Used to make a POST request to the API
    ApiService.prototype.post = function (url, body, options) {
        return this.httpClient.post(url, body, options);
    };
    // Used to make a POST request to the API
    ApiService.prototype.postGet = function (url, body, options) {
        return this.httpClient.post(url, body, options);
    };
    ApiService = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
