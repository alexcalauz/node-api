import Validators from './../../Core/Validators';

export const betsBaseSchema = {
  userId: [
    {
      validator: Validators.required,
      errorMessage: 'Missing title field',
    },
    {
      validator: Validators.type,
      param: 'number',
      errorMessage: 'UserId should be number',
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
  ...betsBaseSchema,
  id: [
    {
      validator: Validators.excluded,
      errorMessage: 'id should not be passed',
    },
  ],
}

export const betsPostSchema = {
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
        value: 1,
      },
    },
  ],
}