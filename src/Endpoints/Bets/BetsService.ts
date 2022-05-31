// NOT USED RIGHT NOW

import { injectable } from 'tsyringe';
import DB from '../../Core/DB';

@injectable()

export default class BetsService {
  db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  getBets() {
  }

  addBet() {
  }
}
