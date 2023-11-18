"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const verifyToken_1 = require("../libs/verifyToken");
const sensor_controller_1 = require("../controllers/sensor.controller");
router.get('/all', verifyToken_1.TokenValidation, sensor_controller_1.getAllSensors);
router.get('/get/:id', verifyToken_1.TokenValidation, sensor_controller_1.getOne);
exports.default = router;
