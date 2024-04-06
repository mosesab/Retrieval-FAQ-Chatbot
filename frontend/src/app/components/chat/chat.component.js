"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
        this.showChat = true;
        this.userInput = '';
        this.messages = [];
        // An Event to call a method in parent component
        this.eventEmitter = new core_1.EventEmitter();
    }
    ChatComponent.prototype.toggleChat = function () {
        this.showChat = !this.showChat;
    };
    ChatComponent.prototype.sendMessage = function () {
        if (this.userInput.trim() !== '') {
            this.messages.push({ text: this.userInput, type: "sent" });
            this.eventEmitter.emit(this.userInput);
            this.userInput = '';
        }
    };
    ChatComponent.prototype.showMessage = function (message) {
        this.messages.push({ text: message, type: "received" });
    };
    __decorate([
        (0, core_1.Output)()
    ], ChatComponent.prototype, "eventEmitter", void 0);
    ChatComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-chat',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.FormsModule],
            templateUrl: './chat.component.html',
            styleUrl: './chat.component.scss'
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
