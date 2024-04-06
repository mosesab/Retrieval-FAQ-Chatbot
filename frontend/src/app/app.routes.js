"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var home_component_1 = require("./home/home.component");
// Your routing file should look like this
exports.routes = [
    // A route to the home page (component)
    {
        path: '',
        component: home_component_1.HomeComponent,
    },
    {
        path: 'faqs',
        loadChildren: function () {
            return Promise.resolve().then(function () { return require('./modules/faqs/faqs.module'); }).then(function (m) { return m.FaqsModule; });
        },
    },
];
