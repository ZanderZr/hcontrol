"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEEDING_ROUTES = void 0;
const feeding_page_component_1 = require("./feeding-page/feeding-page.component");
exports.FEEDING_ROUTES = [
    { path: '**', component: feeding_page_component_1.FeedingPageComponent, data: { title: 'Alimentación' } }
];
