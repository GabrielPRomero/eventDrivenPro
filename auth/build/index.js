"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const producer_1 = __importDefault(require("./producer"));
const PORT = 3000;
const QUEUE_NAME = "eventdriven";
const app = (0, express_1.default)();
require('dotenv').config();
const AMQP_URL = process.env.AMQP_URL;
const producer = (0, producer_1.default)(AMQP_URL, QUEUE_NAME);
app.use(body_parser_1.default.json());
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log('Registering user...');
    console.log(req.body);
    const msg = {
        action: 'REGISTER',
        data: { email, password },
    };
    producer(JSON.stringify(msg));
    return res.send('OK');
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login user...');
    const msg = {
        action: 'LOGIN',
        data: { email, password },
    };
    producer(JSON.stringify(msg));
    return res.send('OK');
});
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map