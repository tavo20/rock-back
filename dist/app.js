"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
// Routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const recordSensor_route_1 = __importDefault(require("./routes/recordSensor.route"));
const sensor_route_1 = __importDefault(require("./routes/sensor.route"));
const app = (0, express_1.default)();
exports.app = app;
let server = (0, http_1.createServer)(app);
exports.server = server;
app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//middlewares
if (!process.env.PRODUCTION_MODE) {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:8100',
    credentials: true,
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)());
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/record/sensor', recordSensor_route_1.default);
app.use('/api/sensor', sensor_route_1.default);
