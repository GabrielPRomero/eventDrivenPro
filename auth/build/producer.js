"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const createMQProducer = (amqpUrl, queueName) => {
    console.log('Connecting to RabbitMQ...');
    let ch;
    callback_api_1.default.connect(amqpUrl, (errorConnect, connection) => {
        if (errorConnect) {
            console.log('Error connecting to RabbitMQ: ', errorConnect);
            return;
        }
        connection.createChannel((errorChannel, channel) => {
            if (errorChannel) {
                console.log('Error creating channel: ', errorChannel);
                return;
            }
            ch = channel;
            console.log('Connected to RabbitMQ');
        });
    });
    return (msg) => {
        console.log('Produce message to RabbitMQ...');
        ch.sendToQueue(queueName, Buffer.from(msg));
    };
};
exports.default = createMQProducer;
//# sourceMappingURL=producer.js.map