"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var table_1 = require("primeng/table");
var FaqsComponent = /** @class */ (function () {
    function FaqsComponent(apiService) {
        this.apiService = apiService;
        this.headers = ["Index", "Category", "Question", "Answer"];
        this.faqsArray = [];
        this.currentAPIPage = 0;
        this.totalAPIRecords = 0;
    }
    FaqsComponent.prototype.ngOnInit = function () {
        this.fetchFaqs(1);
    };
    FaqsComponent.prototype.pageChange = function (event) {
        console.log("event.first :", event.first);
        console.log("event.rows :", event.rows);
        console.log("this.faqsArray.length  :", this.faqsArray.length);
        var timeToLoadMore = event.first >= (this.faqsArray.length - event.rows);
        var thereIsMoreToLoad = this.faqsArray.length < this.totalAPIRecords;
        console.log("timeToLoadMore :", timeToLoadMore);
        console.log("thereIsMoreToLoad :", thereIsMoreToLoad);
        if (timeToLoadMore && thereIsMoreToLoad) {
            this.fetchFaqs(this.currentAPIPage + 1);
        }
    };
    FaqsComponent.prototype.resetPaginator = function () {
        //this.paginator?.changePage(0);
        console.log("resetPaginator() called");
    };
    FaqsComponent.prototype.fetchFaqs = function (page) {
        var _this = this;
        var params = { pageNumber: page, perPage: 70 };
        //{params, responseType: 'json'}
        this.sendRequest(this.apiService.getUrl, params).subscribe(function (response) {
            console.log("API FAQ Response:", response);
            // add the faqs in the response to data
            _this.currentAPIPage = response.page;
            _this.totalAPIRecords = response.totalRecords;
            for (var i = 0; i < response.items.length; i++) {
                _this.faqsArray.push({
                    category: response.items[i].Category,
                    question: response.items[i].Question,
                    answer: response.items[i].Answer,
                    index: (_this.faqsArray.length + 1).toString()
                });
            }
        }, function (error) {
            // Handle errors if any
            console.error("API FAQ Error:", error);
        });
    };
    // Send API requevst to retrieve faqa from the bot
    FaqsComponent.prototype.sendRequest = function (url, params) {
        return this.apiService.postGet(url, params, {});
    };
    ;
    FaqsComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-faqs',
            standalone: true,
            imports: [
                common_1.CommonModule, table_1.TableModule
            ],
            templateUrl: './faqs.component.html',
            styleUrl: './faqs.component.scss'
        })
    ], FaqsComponent);
    return FaqsComponent;
}());
exports.FaqsComponent = FaqsComponent;
