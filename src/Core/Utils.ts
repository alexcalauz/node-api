import { Routes } from "./Routes";
import { Config } from "./Config";
import { container } from "tsyringe";

export default class Utils {

  static createEndpoint(path: string, methodName: string, fn, router): void {
    // NOT USED RIGHT NOW
    router[methodName](path, (req, res) => {
      fn(req, res).catch(err => {
        res.status(err.status).send(err.error)
      });
    });

  }

  static setupRoutes(app) {
    for (let i in Routes) {
      const route = Routes[i];
      app.use(Config.path + route.path, container.resolve(route.controller).getEndpoints());
    }
  }

}