"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const createMQConsumer = (amqpURl, queueName) => {
    console.log('Connecting to RabbitMQ...');
    return () => {
        callback_api_1.default.connect(amqpURl, (errConn, conn) => {
            if (errConn) {
                throw errConn;
            }
            conn.createChannel((errChan, chan) => {
                if (errChan) {
                    throw errChan;
                }
                console.log('Connected to RabbitMQ');
                chan.assertQueue(queueName, { durable: true });
                chan.consume(queueName, (msg) => {
                    if (msg) {
                        const parsed = JSON.parse(msg.content.toString());
                        switch (parsed.action) {
                            case 'REGISTER':
                                console.log('Consuming REGISTER action', parsed.data);
                                break;
                            case 'LOGIN':
                                console.log('Consuming LOGIN action', parsed.data);
                                break;
                            default:
                                break;
                        }
                    }
                }, { noAck: true });
            });
        });
    };
};
exports.default = createMQConsumer;
//# sourceMappingURL=consumer.js.map