"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const consumer_1 = __importDefault(require("./consumer"));
const PORT = 3001;
const QUEUE_NAME = "eventdriven";
const app = (0, express_1.default)();
require('dotenv').config();
const AMQP_URL = process.env.AMQP_URL;
const consumer = (0, consumer_1.default)(AMQP_URL, QUEUE_NAME);
consumer();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map