"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = [
    {
        path: '',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./modules/main/main.routes'))).then((m) => m.MAIN_ROUTES),
    },
    {
        path: 'auth',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./modules/auth/auth.routes'))).then((m) => m.AUTH_ROUTES),
    },
    {
        path: 'mental',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./modules/mental/mental.routes'))).then((m) => m.MENTAL_ROUTES),
    },
    {
        path: 'physic',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./modules/physic/physic.routes'))).then((m) => m.PHYSIC_ROUTES),
    },
    {
        path: 'feeding',
        loadChildren: () => Promise.resolve().then(() => __importStar(require('./modules/feeding/feeding.routes'))).then((m) => m.FEEDING_ROUTES),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
