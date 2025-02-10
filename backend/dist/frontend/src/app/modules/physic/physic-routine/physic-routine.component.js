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
exports.PhysicRoutineComponent = void 0;
const button_toggle_1 = require("@angular/material/button-toggle");
const core_1 = require("@angular/core");
const page_component_1 = require("../../page/page.component");
const exercise_card_component_1 = require("../../../components/exercise-card/exercise-card.component");
const card_1 = require("@angular/material/card");
const form_field_1 = require("@angular/material/form-field");
const core_2 = require("@angular/material/core");
const select_1 = require("@angular/material/select");
const input_1 = require("@angular/material/input");
const common_1 = require("@angular/common");
const routine_card_component_1 = require("../../../components/routine-card/routine-card.component");
const fab_button_component_1 = require("../../../components/fab-button/fab-button.component");
const forms_1 = require("@angular/forms");
let PhysicRoutineComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-physic-routine',
            standalone: true,
            imports: [
                common_1.CommonModule,
                page_component_1.PageComponent,
                exercise_card_component_1.ExerciseCardComponent,
                card_1.MatCardModule,
                select_1.MatSelectModule,
                core_2.MatOptionModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_toggle_1.MatButtonToggleModule,
                routine_card_component_1.RoutineCardComponent,
                fab_button_component_1.FabButtonComponent,
                forms_1.ReactiveFormsModule
            ],
            templateUrl: './physic-routine.component.html',
            styleUrl: './physic-routine.component.scss',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PhysicRoutineComponent = _classThis = class {
        constructor(_exerciseService, fb) {
            this._exerciseService = _exerciseService;
            this.fb = fb;
            this.newExercises = [];
            this.routines = [];
            this.exercises = [];
            this.types = [
                'cardio',
                'olympic_weightlifting',
                'plyometrics',
                'powerlifting',
                'strength',
                'stretching',
                'strongman',
            ];
            this.muscles = [
                'abdominals',
                'abductors',
                'adductors',
                'biceps',
                'calves',
                'chest',
                'forearms',
                'glutes',
                'hamstrings',
                'lats',
                'lower_back',
                'middle_back',
                'neck',
                'quadriceps',
                'traps',
                'triceps',
            ];
            this.difficulty = ['beginner', 'intermediate', 'expert'];
            this.selectedMuscle = '';
            this.selectedType = '';
            this.selectedDiff = '';
            this.routineCreation = false;
            this.formRoutine = this.fb.group({
                name: ['', forms_1.Validators.required],
                description: [''],
            });
        }
        ngOnInit() { }
        // Llamada combinada para cargar ejercicios por los tres filtros
        loadExercises() {
            // Creamos un objeto con los filtros seleccionados
            const filters = {
                type: this.selectedType,
                muscle: this.selectedMuscle,
                difficulty: this.selectedDiff,
            };
            // Llamamos al servicio pasando todos los filtros
            this._exerciseService.getFilteredExercises(filters).subscribe((data) => {
                this.exercises = data;
                console.log('Ejercicios:', this.exercises);
            }, (error) => {
                console.error('Error al obtener ejercicios:', error);
            });
        }
        setRoutineCreation(value) {
            this.routineCreation = value;
        }
        pushToRoutine(exercise) { }
    };
    __setFunctionName(_classThis, "PhysicRoutineComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PhysicRoutineComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PhysicRoutineComponent = _classThis;
})();
exports.PhysicRoutineComponent = PhysicRoutineComponent;
