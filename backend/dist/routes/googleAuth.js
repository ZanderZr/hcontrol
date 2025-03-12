"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleAuth_1 = require("../controllers/googleAuth");
const router = (0, express_1.Router)();
router.post('/', googleAuth_1.authGoogle);
// Ruta para redirigir a Google
/* router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback después del login en Google
router.get('/google/callback', passport.authenticate('google', { session: false }),
    (req, res) => {
        // Extraer token del usuario autenticado
        const user = req.user as any;
        res.redirect(`http://localhost:4200/login-success?token=${user.token}`);
    }
); */
exports.default = router;
