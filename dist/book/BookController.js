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
const BookService_1 = __importDefault(require("./BookService"));
const DB_1 = __importDefault(require("../DB"));
let BookController = class BookController {
    constructor(bookService, db) {
        this.bookService = bookService;
        this.router = new express_1.Router();
        this.db = db;
    }
    routes() {
        this.router.get('/', (req, res) => {
            console.log(req.path);
            this.db.query('SELECT * FROM bets').then(data => {
                res.send(data);
            });
        });
        return this.router;
    }
};
BookController = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [BookService_1.default, DB_1.default])
], BookController);
exports.default = BookController;
//# sourceMappingURL=BookController.js.map