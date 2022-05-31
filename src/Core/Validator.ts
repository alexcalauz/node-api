import Validators from "./Validators";

export default class Validator {

  static async getErrors(model, object): Promise<any> {
    const errors = {
      errorMessages: [],
      status: 400,
    };
    for (let i in model) {
      const field = model[i];
      for (let j in field) {
        const validation = field[j];
        console.log(validation.validator, Validators.required);
        if(!object[i] && validation.validator !== Validators.required) {
          continue;
        }
        const errorMessage = await validation.validator(object[i], validation.errorMessage, validation.param);
        if(errorMessage) {
          if(validation.validator === Validators.existsInDb) {
            errors.status = 404;
          }
          errors.errorMessages.push(errorMessage);
        }
      }
    }
    return errors;
  }
}