import BetsController from "../Endpoints/Bets/BetsController";

export const Routes = [
  {
    path: '/bets/?',
    controller: BetsController,
  },
];