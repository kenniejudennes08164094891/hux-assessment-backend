"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const main_1 = require("../src/main");
async function handler(req, res) {
    const app = await (0, main_1.default)();
    return app(req, res);
}
//# sourceMappingURL=index.js.map