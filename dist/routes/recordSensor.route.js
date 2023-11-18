"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const verifyToken_1 = require("../libs/verifyToken");
const recordSensor_controller_1 = require("../controllers/recordSensor.controller");
router.post('/create', verifyToken_1.TokenValidation, recordSensor_controller_1.create);
router.get('/data/:id', verifyToken_1.TokenValidation, recordSensor_controller_1.getDataBySensor);
exports.default = router;
