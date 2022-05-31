
import { container } from 'tsyringe';
import DB from './DB';

export default class Validators {

  static db = container.resolve(DB);

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
    if (typeof(value) !== param) {
      return errorMessage;
    }
    return false;
  }

  static async existsInDb(value, errorMessage, params) {
    const res = await Validators.db.query(`SELECT count(t.${params.column}) as count from ${params.table} t WHERE t.${params.column}="${value}"`);
    if(!res[0].count) {
      return errorMessage;
    }
    return false;
  }
}