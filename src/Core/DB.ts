import mysql from 'mysql';
import { singleton, inject, container } from 'tsyringe';
import { Config } from './Config';

container.register("DBParams", { useValue: Config.connectionParams });
@singleton()

export default class DB {
  connection = null;
  constructor(@inject("DBParams") params: string) {
    this.connection = mysql.createConnection(params);
    this.connection.connect((err) => {
      if (err) throw err;
    });
  }

  query(q, filter = { parameters: {} }) {
    return new Promise((resolve, reject) => {
      this.connection.query(q, filter.parameters, (err, res) => {
        if(err) {
          return reject(err);
        };
        resolve(res);
      });
    })
  }

  insert(tableName, row) {
    const columns = Object.keys(row).join(', ');
    const values = Object.values(row).map(value => typeof(value) === 'string' ? `'${value}'` : value).join(', ');
    const q = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values})`;
    return this.query(q);
  }

  insertMultiple(tableName, rows) {
    if(!Array.isArray(rows)) {
      rows = [rows];
    }
    const columns = Object.keys(rows[0]).join(', ');
    const values = rows.map(row => {
      return Object.values(row).join(',')
    }).map(mappedRow => {
      return `(${mappedRow})`
    }).join(',');

    const q = `INSERT INTO ${tableName} (${columns}) VALUES ${values}`;
    return this.query(q);
  }

  update(tableName, row, where) {
    const columns = Object.keys(row);
    const values = Object.values(row).map(value => typeof(value) === 'string' ? `'${value}'` : value);

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

}