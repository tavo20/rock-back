"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const recordSensor_controller_1 = require("../controllers/recordSensor.controller");
router.post('/create', recordSensor_controller_1.create);
exports.default = router;
