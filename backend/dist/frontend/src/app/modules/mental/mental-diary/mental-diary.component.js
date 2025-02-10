"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentalDiaryComponent = void 0;
const core_1 = require("@angular/core");
const page_component_1 = require("../../page/page.component");
const button_1 = require("@angular/material/button");
const datepicker_1 = require("@angular/material/datepicker");
const form_field_1 = require("@angular/material/form-field");
const input_1 = require("@angular/material/input");
const core_2 = require("@angular/material/core");
let MentalDiaryComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-mental-diary',
            standalone: true,
            imports: [page_component_1.PageComponent, core_2.MatNativeDateModule, form_field_1.MatFormFieldModule, input_1.MatInputModule, datepicker_1.MatDatepickerModule, button_1.MatButtonModule],
            templateUrl: './mental-diary.component.html',
            styleUrl: './mental-diary.component.scss'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MentalDiaryComponent = _classThis = class {
        constructor() {
            this.day = "";
            this.day = this.getToday();
        }
        getToday() {
            const today = new Date();
            const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' }); // Cambia 'es-ES' por el idioma deseado
            return dayName.charAt(0).toUpperCase() + dayName.slice(1);
        }
        getDate() {
            const today = new Date();
            return today.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
    };
    __setFunctionName(_classThis, "MentalDiaryComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MentalDiaryComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MentalDiaryComponent = _classThis;
})();
exports.MentalDiaryComponent = MentalDiaryComponent;
