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
const tsyringe_1 = require("tsyringe");
const BookRepository_1 = __importDefault(require("./BookRepository"));
const DB_1 = __importDefault(require("../DB"));
let BookService = class BookService {
    constructor(bookRepository, db) {
        this.bookRepository = bookRepository;
        this.db = db;
    }
    getBooks() {
        console.log(this.db.get());
        return this.bookRepository.getBooks();
    }
};
BookService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [BookRepository_1.default, DB_1.default])
], BookService);
exports.default = BookService;
//# sourceMappingURL=BookService.js.map