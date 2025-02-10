"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ROUTES = void 0;
const auth_page_component_1 = require("./auth-page/auth-page.component");
exports.AUTH_ROUTES = [
    { path: 'auth', component: auth_page_component_1.AuthPageComponent, },
    { path: '', component: auth_page_component_1.AuthPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
