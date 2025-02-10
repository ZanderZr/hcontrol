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
exports.AuthPageComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const page_component_1 = require("../../page/page.component");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
let AuthPageComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-auth-page',
            standalone: true,
            imports: [common_1.CommonModule, page_component_1.PageComponent, forms_1.ReactiveFormsModule, router_1.RouterModule],
            templateUrl: './auth-page.component.html',
            styleUrl: './auth-page.component.scss',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthPageComponent = _classThis = class {
        constructor(router, fb, _authService, toastr) {
            this.router = router;
            this.fb = fb;
            this._authService = _authService;
            this.toastr = toastr;
            this.isLoginPage = true;
            this.roles = ['COACH', 'DIETITIST', 'PSYCHOLOGIST', 'USER'];
            this.formRegister = this.fb.group({
                username: ['', forms_1.Validators.required],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                password1: ['', forms_1.Validators.required],
                password2: ['', forms_1.Validators.required],
                role: []
            });
            this.formLogin = this.fb.group({
                email: ['', forms_1.Validators.required],
                password: ['', forms_1.Validators.required],
            });
        }
        register() {
            // Si las contraseñas coinciden...
            if (this.formRegister.value.password1 === this.formRegister.value.password2) {
                const user = {
                    username: this.formRegister.value.username,
                    email: this.formRegister.value.email,
                    password: this.formRegister.value.password1,
                    role: this.formRegister.value.role
                };
                // Llamada al servicio AuthService
                this._authService.register(user).subscribe({
                    next: data => {
                        this._authService.setToken(data.token);
                        this.router.navigate(['/feeding']); // Navega tras el registro
                    },
                    error: error => {
                        console.log(error);
                        this.toastr.warning('Email o username existen', 'Warning');
                    }
                });
            }
            else {
                this.toastr.warning('Las contraseñas deben ser iguales', 'Warning');
            }
        }
        login() {
            const user = {
                email: this.formLogin.value.email,
                password: this.formLogin.value.password
            };
            this._authService.login(user).subscribe({
                next: data => {
                    this._authService.setToken(data.token); // Guarda el token recibido en el servicio _usersService
                    this.router.navigateByUrl('/feeding'); // Redirige al usuario a la ruta '/list'
                    console.log("login ok");
                },
                error: error => {
                    console.log(error); // Imprime el error en la consola
                    this.toastr.error('Email o contraseña incorrectos', 'Error'); // Muestra un mensaje de error usando toastr
                }
            });
        }
        setIsLogin(value) {
            this.isLoginPage = value;
        }
        loginRoute() {
            this.router.navigate(['/auth/login']);
        }
        registerRoute() {
            this.router.navigate(['/auth/register']);
        }
    };
    __setFunctionName(_classThis, "AuthPageComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthPageComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthPageComponent = _classThis;
})();
exports.AuthPageComponent = AuthPageComponent;
