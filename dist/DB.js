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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const tsyringe_1 = require("tsyringe");
const Config_1 = require("./Config");
tsyringe_1.container.register("DBParams", { useValue: Config_1.Config.connectionParams });
let DB = class DB {
    constructor(params) {
        this.connection = null;
        this.connection = mysql_1.default.createConnection(params);
        this.connection.connect((err) => {
            if (err)
                throw err;
            console.log('Connected!');
        });
    }
    query(q, filter = { parameters: {} }) {
        return new Promise((resolve, reject) => {
            this.connection.query(q, filter.parameters, (err, res) => {
                if (err) {
                    return reject(err);
                }
                ;
                resolve(res);
            });
        });
    }
    insert(tableName, row) {
        const columns = Object.keys(row).join(', ');
        const values = Object.values(row).map(value => typeof (value) === 'string' ? `'${value}'` : value).join(', ');
        const q = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values})`;
        return this.query(q);
    }
    update(tableName, row, where) {
        const columns = Object.keys(row);
        const values = Object.values(row).map(value => typeof (value) === 'string' ? `'${value}'` : value);
        const set = columns.map((col, index) => `${col} = ${values[index]}`).join(', ');
        const q = `UPDATE \`${tableName}\` SET ${set} WHERE ${this.getWhere(where)}`;
        return this.query(q);
    }
    getWhere(where) {
        const columns = Object.keys(where);
        const values = Object.values(where);
        const whereString = columns.map((col, index) => `${col} = ${values[index]}`).join(' AND ');
        return whereString;
    }
    remove(tableName, where) {
        const q = `DELETE FROM \`${tableName}\` WHERE ${this.getWhere(where)}`;
        return this.query(q);
    }
};
DB = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)("DBParams")),
    __metadata("design:paramtypes", [String])
], DB);
exports.default = DB;
//# sourceMappingURL=DB.js.map