"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const BetsService_1 = __importDefault(require("./BetsService"));
const DB_1 = __importDefault(require("../DB"));
const odata_v4_mysql_1 = require("odata-v4-mysql");
const Validator_1 = __importDefault(require("../Validator"));
const BetsSchema_1 = require("./BetsSchema");
let BetsController = class BetsController {
    constructor(betsService, db) {
        this.betsService = betsService;
        this.router = new express_1.Router();
        this.db = db;
    }
    getEndpoints() {
        this.router.get('/', (req, res) => {
            const filter = (0, odata_v4_mysql_1.createFilter)(req.query.$filter);
            const query = `SELECT * FROM bet WHERE ${filter.where}`;
            this.db.query(query, filter).then((data) => {
                res.send({
                    '@odata.context': req.protocol + '://' + req.get('host') + '/api/$metadata#Users',
                    value: data
                });
            }).catch(err => {
                res.status(400).send(err);
            });
        });
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const errors = yield Validator_1.default.getErrors(BetsSchema_1.betsPostSchema, payload);
            if (errors.length) {
                res.status(400).send({ errors });
            }
            else {
                const where = { id: payload.id };
                delete payload.id;
                return this.db.update('bet', payload, where).then(() => {
                    res.send({ message: 'Bet Updated' });
                }).catch(err => {
                    // 500 error; Should not happen
                    res.status(500).send(err);
                });
            }
        }));
        this.router.put('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = yield Validator_1.default.getErrors(BetsSchema_1.betsPutSchema, req.body);
            if (errors.length) {
                res.status(400).send({ errors });
            }
            else {
                this.db.insert('bet', req.body).then(() => {
                    res.send({ message: 'Bet Added' });
                }).catch(err => {
                    // 500 error; Should not happen
                    res.status(500).send(err);
                });
            }
        }));
        return this.router;
    }
};
BetsController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [BetsService_1.default, DB_1.default])
], BetsController);
exports.default = BetsController;
//# sourceMappingURL=BetsController.js.map