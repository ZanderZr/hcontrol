"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHYSIC_ROUTES = void 0;
const physic_page_component_1 = require("./physic-page/physic-page.component");
const physic_records_component_1 = require("./physic-records/physic-records.component");
const physic_routine_component_1 = require("./physic-routine/physic-routine.component");
exports.PHYSIC_ROUTES = [
    { path: 'records', component: physic_records_component_1.PhysicRecordsComponent },
    { path: 'routine', component: physic_routine_component_1.PhysicRoutineComponent },
    { path: '', component: physic_page_component_1.PhysicPageComponent, data: { title: 'Salud física' } },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
