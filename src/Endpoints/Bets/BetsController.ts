import { Router } from 'express';
import { autoInjectable } from 'tsyringe';
import BetsService from './BetsService';
import DB from '../../Core/DB';
import { createFilter } from 'odata-v4-mysql'
import Validator from '../../Core/Validator';
import { betsPostSchema, betsPutSchema, betsDeleteSchema } from './BetsSchema';
import Utils from '../../Core/Utils';
import { IBet } from '../../interfaces';

@autoInjectable()
export default class BetsController {
  betsService: BetsService;
  router: Router;
  db: DB;

  constructor(betsService: BetsService, db: DB) {
    this.betsService = betsService;
    this.router = new Router();
    this.db = db;
  }

  getEndpoints() {

    this.router.get('/', (req, res) => {
      const filter = createFilter(req.query.$filter);
      const query = `SELECT * FROM bet WHERE ${filter.where}`;
      this.db.query(query, filter).then((data) => {
        res.send(Utils.getODataResponse(data, req, 'Bets'));
      }).catch(err => {
        res.status(500).send(err);
      })
    });

    this.router.put('/', async (req, res) => {
      const payload: IBet = req.body;
      const errors = await Validator.getErrors(betsPutSchema, payload);

      if(errors.errorMessages.length) {
          res.status(errors.status).send({ errors });
      } else {
        const where = { id: payload.id };
        delete payload.id;
        return this.db.update('bet', payload, where).then(() => {
          res.send({ message: 'Bet Updated' });
        }).catch(err => {
          // 500 error; Should not happen
          res.status(500).send(err)
        });
      }
    })

    this.router.post('/', async (req, res) => {
      const payload: IBet = req.body;
      const errors = await Validator.getErrors(betsPostSchema, req.body);

      if(errors.errorMessages.length) {
          res.status(errors.status).send({ errors });
      } else {
        this.db.insert('bet', payload).then(() => {
          res.send({ message: 'Bet Added' });
        }).catch(err => {
          // 500 error; Should not happen
          res.status(500).send(err)
        });
      }
    });

    this.router.delete('/', async (req, res) => {
      const payload: IBet = req.body;
      const errors = await Validator.getErrors(betsDeleteSchema, req.body);

      if(errors.errorMessages.length) {
          res.status(errors.status).send({ errors });
      } else {
        this.db.remove('bet', payload).then(() => {
          res.send({ message: 'Bet deleted' });
        }).catch(err => {
          // 500 error; Should not happen
          res.status(500).send(err)
        });
      }
    });

    return this.router;
  }
}
