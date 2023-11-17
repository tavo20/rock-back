"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const sensor_controller_1 = require("../controllers/sensor.controller");
router.get('/all', sensor_controller_1.getAllSensors);
router.get('/get/:id', sensor_controller_1.getOne);
exports.default = router;
