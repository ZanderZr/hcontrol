"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENTAL_ROUTES = void 0;
const mental_page_component_1 = require("./mental-page/mental-page.component");
const mental_diary_component_1 = require("./mental-diary/mental-diary.component");
const mental_breath_component_1 = require("./mental-breath/mental-breath.component");
exports.MENTAL_ROUTES = [
    { path: 'diary', component: mental_diary_component_1.MentalDiaryComponent },
    { path: 'breath', component: mental_breath_component_1.MentalBreathComponent },
    { path: '', component: mental_page_component_1.MentalPageComponent, data: { title: 'Salud mental' } },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
