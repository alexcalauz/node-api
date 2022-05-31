"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static createEndpoint(path, methodName, fn, router) {
        router[methodName](path, (req, res) => {
            fn(req, res).catch(err => {
                res.status(err.status).send(err.error);
            });
        });
    }
}
exports.default = Utils;
//# sourceMappingURL=Utils.js.map