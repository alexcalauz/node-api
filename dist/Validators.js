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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DB_1 = __importDefault(require("./DB"));
class Validators {
    static required(value, errorMessage) {
        if (value === undefined || value === null || value === '') {
            return errorMessage;
        }
        return false;
    }
    static minLength(value, errorMessage, param) {
        if (`${value}`.length < param) {
            return errorMessage;
        }
        return false;
    }
    static maxLength(value, errorMessage, param) {
        if (`${value}`.length > param) {
            return errorMessage;
        }
        return false;
    }
    static excluded(value, errorMessage, param) {
        if (value !== undefined) {
            return errorMessage;
        }
        return false;
    }
    static type(value, errorMessage, param) {
        if (typeof (value) !== param) {
            return errorMessage;
        }
        return false;
    }
    static existsInDb(value, errorMessage, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Validators.db.query(`SELECT count(t.${params.column}) as count from ${params.table} t WHERE t.${params.column}="${value}"`);
            if (!res[0].count) {
                return errorMessage;
            }
            return false;
        });
    }
}
exports.default = Validators;
Validators.db = tsyringe_1.container.resolve(DB_1.default);
//# sourceMappingURL=Validators.js.map