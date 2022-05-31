"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const BetsController_1 = __importDefault(require("./bet/BetsController"));
const Routes_1 = require("./Routes");
const Config_1 = require("./Config");
var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.port || Config_1.Config.port;
const app = (0, express_1.default)();
app.use(bodyParser.json());
for (let i in Routes_1.Routes) {
    const route = Routes_1.Routes[i];
    app.use(Config_1.Config.path + route.path, tsyringe_1.container.resolve(BetsController_1.default).getEndpoints());
}
app.listen(port, () => console.log(`listening on port: ${port}`));
//# sourceMappingURL=index.js.map