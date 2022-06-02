import Validators from "./Validators";

export default class Validator {

  static async getErrors(model, object): Promise<any> {
    const errorObject = {
      errorMessages: [],
      status: 400,
    };
    for (let i in model) {
      // For each Field
      const field = model[i];
      for (let j in field) {
        // For each Validator in Field
        const validation = field[j];
        if(!object[i] && validation.validator !== Validators.required) {
          continue;
        }
        const errorMessage = await validation.validator(object[i], validation.errorMessage, validation.param);
        if(errorMessage) {
          if(validation.validator === Validators.existsInDb) {
            errorObject.status = 404;
          }
          errorObject.errorMessages.push(errorMessage);
        }
      }
    }
    return errorObject;
  }
}