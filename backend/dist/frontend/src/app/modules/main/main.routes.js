"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIN_ROUTES = void 0;
const intro_page_component_1 = require("./intro-page/intro-page.component");
const main_page_component_1 = require("./main-page/main-page.component");
exports.MAIN_ROUTES = [
    { path: '', component: intro_page_component_1.IntroPageComponent },
    { path: 'main', component: main_page_component_1.MainPageComponent },
];
