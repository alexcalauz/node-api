"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    static getErrors(model, object) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorMessages = [];
            for (let i in model) {
                const field = model[i];
                for (let j in field) {
                    const validation = field[j];
                    const errorMessage = yield validation.validator(object[i], validation.errorMessage, validation.param);
                    if (errorMessage) {
                        errorMessages.push(errorMessage);
                    }
                }
            }
            return errorMessages;
        });
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map