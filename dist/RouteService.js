"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static createEndpoint(path, methodName, fn, router) {
        router[methodName](path, (req, res) => {
            fn(req, res).catch(err => console.log(err));
        });
    }
}
exports.default = Utils;
//# sourceMappingURL=RouteService.js.map