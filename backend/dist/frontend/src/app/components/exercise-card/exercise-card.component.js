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
exports.ExerciseCardComponent = void 0;
const expansion_1 = require("@angular/material/expansion");
const core_1 = require("@angular/core");
const card_1 = require("@angular/material/card");
const icon_1 = require("@angular/material/icon");
let ExerciseCardComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-exercise-card',
            standalone: true,
            imports: [
                card_1.MatCardModule,
                expansion_1.MatExpansionModule,
                icon_1.MatIconModule
            ],
            templateUrl: './exercise-card.component.html',
            styleUrl: './exercise-card.component.scss'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _cardClick_decorators;
    let _cardClick_initializers = [];
    let _cardClick_extraInitializers = [];
    let _clickAdd_decorators;
    let _clickAdd_initializers = [];
    let _clickAdd_extraInitializers = [];
    let _exercise_decorators;
    let _exercise_initializers = [];
    let _exercise_extraInitializers = [];
    var ExerciseCardComponent = _classThis = class {
        onCardClick() {
            this.cardClick.emit();
        }
        onClickAdd() {
            this.clickAdd.emit();
        }
        constructor() {
            this.cardClick = __runInitializers(this, _cardClick_initializers, new core_1.EventEmitter()); // Evento de salida
            this.clickAdd = (__runInitializers(this, _cardClick_extraInitializers), __runInitializers(this, _clickAdd_initializers, new core_1.EventEmitter())); // Evento de salida
            this.exercise = (__runInitializers(this, _clickAdd_extraInitializers), __runInitializers(this, _exercise_initializers, void 0));
            __runInitializers(this, _exercise_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ExerciseCardComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _cardClick_decorators = [(0, core_1.Output)()];
        _clickAdd_decorators = [(0, core_1.Output)()];
        _exercise_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _cardClick_decorators, { kind: "field", name: "cardClick", static: false, private: false, access: { has: obj => "cardClick" in obj, get: obj => obj.cardClick, set: (obj, value) => { obj.cardClick = value; } }, metadata: _metadata }, _cardClick_initializers, _cardClick_extraInitializers);
        __esDecorate(null, null, _clickAdd_decorators, { kind: "field", name: "clickAdd", static: false, private: false, access: { has: obj => "clickAdd" in obj, get: obj => obj.clickAdd, set: (obj, value) => { obj.clickAdd = value; } }, metadata: _metadata }, _clickAdd_initializers, _clickAdd_extraInitializers);
        __esDecorate(null, null, _exercise_decorators, { kind: "field", name: "exercise", static: false, private: false, access: { has: obj => "exercise" in obj, get: obj => obj.exercise, set: (obj, value) => { obj.exercise = value; } }, metadata: _metadata }, _exercise_initializers, _exercise_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExerciseCardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExerciseCardComponent = _classThis;
})();
exports.ExerciseCardComponent = ExerciseCardComponent;
