import Validators from './../../Core/Validators';

export const betsPostSchema = {
  id: [
    {
      validator: Validators.excluded,
      errorMessage: 'id should not be passed',
    },
  ],
  userId: [
    {
      validator: Validators.required,
      errorMessage: 'Missing userId',
    },
    {
      validator: Validators.type,
      param: 'number',
      errorMessage: 'UserId should be number',
    },
    {
      validator: Validators.existsInDb,
      errorMessage: 'user id not found',
      param: {
        column: 'id',
        table: 'user',
      },
    },
  ],
  subscriptionType: [
    {
      validator: Validators.required,
      errorMessage: 'Missing subscription type',
    },
  ],
}

export const betsPutSchema = {
  id: [
    {
      validator: Validators.required,
      errorMessage: 'Missing id field',
    },
    {
      validator: Validators.existsInDb,
      errorMessage: 'id not found',
      param: {
        column: 'id',
        table: 'bet',
      },
    },
  ],
  userId: [
    {
      validator: Validators.existsInDb,
      errorMessage: 'user id not found',
      param: {
        column: 'id',
        table: 'user',
      },
    },
  ],
}

export const betsDeleteSchema = {
  id: [
    {
      validator: Validators.required,
      errorMessage: 'Missing id field',
    },
    {
      validator: Validators.existsInDb,
      errorMessage: 'id not found',
      param: {
        column: 'id',
        table: 'bet',
      },
    },
  ],
}