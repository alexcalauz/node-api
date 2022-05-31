"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betsPutSchema = exports.betsPostSchema = exports.betsBaseSchema = void 0;
exports.betsBaseSchema = {
    userId: [
        {
            validator: Validators.required,
            errorMessage: 'Missing title field',
        },
        {
            validator: Validators.type,
            param: 'number',
            errorMessage: 'UserId should be number',
        },
    ],
    subscriptionType: [
        {
            validator: Validators.required,
            errorMessage: 'Missing subscription type',
        },
    ],
};
exports.betsPostSchema = Object.assign(Object.assign({}, exports.betsBaseSchema), { id: [
        {
            validator: Validators.excluded,
            errorMessage: 'id should not be passed',
        },
    ] });
exports.betsPutSchema = Object.assign(Object.assign({}, exports.betsBaseSchema), { id: [
        {
            validator: Validators.required,
            errorMessage: 'Missing id field',
        },
    ] });
//# sourceMappingURL=BetsValidator.js.map