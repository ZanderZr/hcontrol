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
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const environment_1 = require("../../../../environments/environment");
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(http, cookies) {
            this.http = http;
            this.cookies = cookies;
            this.refreshNavbarSubject = new rxjs_1.Subject();
            this.myAppUrl = environment_1.environment.endpoint;
            this.myApiUrl = 'api/users/';
        }
        // La función tap de RxJS se usa para realizar efectos secundarios, en este caso, establecer el token, sin alterar el flujo del observable.
        login(user) {
            return this.http.post(`${this.myAppUrl}${this.myApiUrl}login`, user).pipe((0, rxjs_1.tap)((response) => {
                this.setToken(response.token);
            }));
        }
        register(user) {
            return this.http.post(`${this.myAppUrl}${this.myApiUrl}register`, user);
        }
        setToken(token) {
            const tokenData = JSON.stringify({ token, expiry: Date.now() + 36000000 }); // Establece el token y la fecha de expiración (1 hora)
            this.cookies.set("token", tokenData);
            this.refreshNavbarSubject.next(); // Emisor
        }
        getToken() {
            const tokenData = this.cookies.get("token");
            if (tokenData) {
                const { token, expiry } = JSON.parse(tokenData);
                // Verificar si el token ha expirado
                if (Date.now() < expiry) {
                    return token; // Devuelve el token si no ha expirado
                }
                else {
                    this.logout(); // Si el token ha expirado, cierra la sesión
                    return null;
                }
            }
            return null;
        }
        getUser() {
            const token = this.getToken();
            if (token) {
                return this.http.get(`${this.myAppUrl}${this.myApiUrl}token`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Envía el token en el encabezado Authorization
                    }
                });
            }
            else {
                console.error('No se proporcionó ningún token');
                return (0, rxjs_1.of)(null);
            }
        }
        logout() {
            this.cookies.delete('token');
            this.refreshNavbarSubject.next(); // Emisor
        }
        /*
        El getter refreshNavbar$ en el UsersService es una propiedad de solo lectura que devuelve un Observable
        de tipo void. Este Observable se emite cada vez que se llama a this.refreshNavbarSubject.next(). El propósito
        de este observable es permitir que otros componentes se suscriban a él para recibir notificaciones cuando se
        debe actualizar la interfaz de usuario, como después de un inicio o cierre de sesión.
        */
        get refreshNavbar$() {
            return this.refreshNavbarSubject.asObservable();
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
