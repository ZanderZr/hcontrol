"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExercise = exports.putExercise = exports.postExercise = exports.getExercise = exports.getAllExercise = void 0;
const express_1 = __importDefault(require("express"));
const exercise_1 = __importDefault(require("../models/exercise"));
const router = express_1.default.Router();
exports.getAllExercise = router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exercise_1.default.findAll();
    res.json(data);
}));
exports.getExercise = router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exercise_1.default.findByPk(req.params.id);
    data ? res.json(data) : res.status(404).send('Not Found');
}));
exports.postExercise = router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield exercise_1.default.create(req.body);
        res.status(201).json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
}));
exports.putExercise = router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exercise_1.default.findByPk(req.params.id);
    if (!data)
        return res.status(404).send('Not Found');
    yield data.update(req.body);
    res.json(data);
}));
exports.deleteExercise = router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exercise_1.default.findByPk(req.params.id);
    if (!data)
        return res.status(404).send('Not Found');
    yield data.destroy();
    res.status(204).send();
}));
exports.default = router;
