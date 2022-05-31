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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const BetsService_1 = __importDefault(require("./BetsService"));
const DB_1 = __importDefault(require("../DB"));
let BetsController = class BetsController {
    constructor(betsService, db) {
        this.betsService = betsService;
        this.router = new express_1.Router();
        this.db = db;
    }
    routes() {
        this.router.get('/', (req, res) => {
            this.betsService.getBets().then((data) => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            });
        });
        this.router.post('/', (req, res) => {
            this.betsService.addBet(req.body).then((data) => {
                res.send(data);
            }).catch(err => {
                console.log(err);
            });
        });
        this.router.get('/xxx', (req, res) => {
            res.send({ x: 2323 });
        });
        return this.router;
    }
};
BetsController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [BetsService_1.default, DB_1.default])
], BetsController);
exports.default = BetsController;
//# sourceMappingURL=BetsController.js.map