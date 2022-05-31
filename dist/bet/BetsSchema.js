"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.betsPostSchema = exports.betsPutSchema = exports.betsBaseSchema = void 0;
const Validators_1 = __importDefault(require("./../Validators"));
exports.betsBaseSchema = {
    userId: [
        {
            validator: Validators_1.default.required,
            errorMessage: 'Missing title field',
        },
        {
            validator: Validators_1.default.type,
            param: 'number',
            errorMessage: 'UserId should be number',
        },
    ],
    subscriptionType: [
        {
            validator: Validators_1.default.required,
            errorMessage: 'Missing subscription type',
        },
    ],
};
exports.betsPutSchema = Object.assign(Object.assign({}, exports.betsBaseSchema), { id: [
        {
            validator: Validators_1.default.excluded,
            errorMessage: 'id should not be passed',
        },
    ] });
exports.betsPostSchema = {
    id: [
        {
            validator: Validators_1.default.required,
            errorMessage: 'Missing id field',
        },
        {
            validator: Validators_1.default.existsInDb,
            errorMessage: 'id not found',
            param: {
                column: 'id',
                table: 'bet',
                value: 1,
            },
        },
    ],
};
//# sourceMappingURL=BetsSchema.js.map