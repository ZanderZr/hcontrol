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
exports.RoutineCardComponent = void 0;
const core_1 = require("@angular/core");
const card_1 = require("@angular/material/card");
let RoutineCardComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-routine-card',
            standalone: true,
            imports: [card_1.MatCardModule],
            templateUrl: './routine-card.component.html',
            styleUrl: './routine-card.component.scss'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _imageUrl_decorators;
    let _imageUrl_initializers = [];
    let _imageUrl_extraInitializers = [];
    let _cardClick_decorators;
    let _cardClick_initializers = [];
    let _cardClick_extraInitializers = [];
    let _deleteClick_decorators;
    let _deleteClick_initializers = [];
    let _deleteClick_extraInitializers = [];
    let _editClick_decorators;
    let _editClick_initializers = [];
    let _editClick_extraInitializers = [];
    var RoutineCardComponent = _classThis = class {
        onCardClick() {
            this.cardClick.emit();
            console.log("Card");
        }
        onDelete(event) {
            event.stopPropagation(); // Esto evita que el clic se propague a la tarjeta
            console.log("Delete");
        }
        onEdit(event) {
            event.stopPropagation(); // Esto evita que el clic se propague a la tarjeta
            console.log("Edit");
        }
        constructor() {
            this.title = __runInitializers(this, _title_initializers, 'Card Title');
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, 'This is a brief description of the content.'));
            this.imageUrl = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _imageUrl_initializers, 'book-solid.svg'));
            this.cardClick = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _cardClick_initializers, new core_1.EventEmitter())); // Evento de salida
            this.deleteClick = (__runInitializers(this, _cardClick_extraInitializers), __runInitializers(this, _deleteClick_initializers, new core_1.EventEmitter())); // Evento de salida
            this.editClick = (__runInitializers(this, _deleteClick_extraInitializers), __runInitializers(this, _editClick_initializers, new core_1.EventEmitter())); // Evento de salida
            __runInitializers(this, _editClick_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "RoutineCardComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, core_1.Input)()];
        _description_decorators = [(0, core_1.Input)()];
        _imageUrl_decorators = [(0, core_1.Input)()];
        _cardClick_decorators = [(0, core_1.Output)()];
        _deleteClick_decorators = [(0, core_1.Output)()];
        _editClick_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: obj => "imageUrl" in obj, get: obj => obj.imageUrl, set: (obj, value) => { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
        __esDecorate(null, null, _cardClick_decorators, { kind: "field", name: "cardClick", static: false, private: false, access: { has: obj => "cardClick" in obj, get: obj => obj.cardClick, set: (obj, value) => { obj.cardClick = value; } }, metadata: _metadata }, _cardClick_initializers, _cardClick_extraInitializers);
        __esDecorate(null, null, _deleteClick_decorators, { kind: "field", name: "deleteClick", static: false, private: false, access: { has: obj => "deleteClick" in obj, get: obj => obj.deleteClick, set: (obj, value) => { obj.deleteClick = value; } }, metadata: _metadata }, _deleteClick_initializers, _deleteClick_extraInitializers);
        __esDecorate(null, null, _editClick_decorators, { kind: "field", name: "editClick", static: false, private: false, access: { has: obj => "editClick" in obj, get: obj => obj.editClick, set: (obj, value) => { obj.editClick = value; } }, metadata: _metadata }, _editClick_initializers, _editClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoutineCardComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoutineCardComponent = _classThis;
})();
exports.RoutineCardComponent = RoutineCardComponent;
