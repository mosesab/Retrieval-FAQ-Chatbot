"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var chat_component_1 = require("../components/chat/chat.component");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(elementRef, apiService) {
        this.elementRef = elementRef;
        this.apiService = apiService;
        this.introText = "FUOYE FAQS Chatbot";
        this.passageText = "FUOYE FAQS Chatbot is a retrival based chatbot that answers frequntly asked questions about FUOYE";
        this.scrollSpeed = 0.5;
        this.faqsArray = [];
        // styles.css explicit list of color variables
        this.stylesColorVariablesArray = [
            "var(--primary-color)",
            "var(--highlight-color)",
            "var(--secondary-color)"
        ];
    }
    HomeComponent.prototype.ngOnInit = function () {
        // make it so the colors of the cards is set on init but shuffled on refresh
        this.stylesColorVariablesArray.sort(function () { return Math.random() - 0.5; });
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        for (var i = 0; i < 5; i++) {
            this.faqsArray.push({ category: "Category",
                question: "Question", answer: "Answer", index: (i + 1).toString() });
        }
    };
    // returns a color from the stylesColorVariables
    HomeComponent.prototype.faqCardColor = function (cardIndex) {
        var index = Number(cardIndex);
        if (index >= this.stylesColorVariablesArray.length) {
            index = index - this.stylesColorVariablesArray.length;
        }
        return this.stylesColorVariablesArray[index];
    };
    // On Page Scroll do Parallax Scrolling on Hero Section
    HomeComponent.prototype.onScroll = function (event) {
        var windowHeight = window.innerHeight;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var scrollBottom = scrollTop + windowHeight;
        var elementOffsetTop = this.elementRef.nativeElement.offsetTop;
        var elementOffsetBottom = elementOffsetTop + this.elementRef.nativeElement.offsetHeight;
        var heroBackground = document.querySelector('.hero-background');
        var heroMiddleground = document.querySelector('.hero-middleground');
        var heroForeground = document.querySelector('.hero-foreground');
        if (scrollBottom > elementOffsetTop && scrollTop < elementOffsetBottom) {
            var backgroundOffset = -(scrollTop * this.scrollSpeed) * 0.7;
            var middlegroundOffset = -(scrollTop * (this.scrollSpeed * 1.4)); // Adjust the speed for foreground image
            var foregroundOffset = -(scrollTop * (this.scrollSpeed * 1.8)); // Adjust the speed for foreground image
            heroBackground.style.backgroundPosition = "center ".concat(backgroundOffset, "px");
            heroMiddleground.style.backgroundPosition = "center ".concat(middlegroundOffset, "px");
            heroForeground.style.backgroundPosition = "center ".concat(foregroundOffset, "px");
        }
    };
    //  Called by a child component's event emitter
    HomeComponent.prototype.onChatSendMessage = function (userInput) {
        var _this = this;
        if (userInput === void 0) { userInput = ""; }
        var requestBody = { query: userInput };
        this.sendRequest(this.apiService.postUrl, requestBody).subscribe(function (response) {
            console.log("API Chat Response:", response);
            if (response.length > 0) {
                // show the answer from the first item in response in chatComponent
                _this.chatComponent.showMessage(response[0].Answer);
                // empty the faqsArray array
                _this.faqsArray.splice(0, _this.faqsArray.length);
                for (var i = 0; i < response.length; i++) {
                    _this.faqsArray.push({ category: response[i].Category,
                        question: response[i].Question, answer: response[i].Answer, index: (i + 1).toString() });
                }
            }
        }, function (error) {
            // Handle errors if any
            console.error("API Chat Error:", error);
        });
    };
    // Send API request to ask the bot a question
    HomeComponent.prototype.sendRequest = function (url, body) {
        return this.apiService.post(url, body, {});
    };
    ;
    __decorate([
        (0, core_1.ViewChild)(chat_component_1.ChatComponent)
    ], HomeComponent.prototype, "chatComponent", void 0);
    __decorate([
        (0, core_1.HostListener)('window:scroll', ['$event'])
    ], HomeComponent.prototype, "onScroll", null);
    HomeComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-home',
            standalone: true,
            imports: [
                common_1.CommonModule,
                chat_component_1.ChatComponent,
            ],
            templateUrl: './home.component.html',
            styleUrl: './home.component.scss',
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
