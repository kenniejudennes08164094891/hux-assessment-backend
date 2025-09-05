"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const serverless_express_1 = require("@vendia/serverless-express");
const bootstrap_1 = require("../src/bootstrap");
let server;
async function bootstrapServer() {
    const app = await (0, bootstrap_1.createApp)();
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return (0, serverless_express_1.default)({ app: expressApp });
}
async function handler(req, res) {
    if (!server) {
        server = await bootstrapServer();
    }
    return server(req, res);
}
//# sourceMappingURL=index.js.map