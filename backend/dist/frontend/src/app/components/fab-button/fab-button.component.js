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
exports.FabButtonComponent = void 0;
const core_1 = require("@angular/core");
const button_1 = require("@angular/material/button");
const icon_1 = require("@angular/material/icon");
let FabButtonComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-fab-button',
            standalone: true,
            imports: [button_1.MatButtonModule, icon_1.MatIconModule],
            templateUrl: './fab-button.component.html',
            styleUrls: ['./fab-button.component.scss'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _fabClick_decorators;
    let _fabClick_initializers = [];
    let _fabClick_extraInitializers = [];
    let _icon_decorators;
    let _icon_initializers = [];
    let _icon_extraInitializers = [];
    var FabButtonComponent = _classThis = class {
        onFabClick() {
            this.fabClick.emit();
        }
        constructor() {
            this.fabClick = __runInitializers(this, _fabClick_initializers, new core_1.EventEmitter()); // Evento de salida
            this.icon = (__runInitializers(this, _fabClick_extraInitializers), __runInitializers(this, _icon_initializers, void 0));
            __runInitializers(this, _icon_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "FabButtonComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _fabClick_decorators = [(0, core_1.Output)()];
        _icon_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _fabClick_decorators, { kind: "field", name: "fabClick", static: false, private: false, access: { has: obj => "fabClick" in obj, get: obj => obj.fabClick, set: (obj, value) => { obj.fabClick = value; } }, metadata: _metadata }, _fabClick_initializers, _fabClick_extraInitializers);
        __esDecorate(null, null, _icon_decorators, { kind: "field", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, _icon_initializers, _icon_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FabButtonComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FabButtonComponent = _classThis;
})();
exports.FabButtonComponent = FabButtonComponent;
