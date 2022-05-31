"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const BetsController_1 = __importDefault(require("./bet/BetsController"));
exports.Routes = [
    {
        path: '/bets/?',
        controller: BetsController_1.default,
    },
];
//# sourceMappingURL=Routes.js.map