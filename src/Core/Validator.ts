
export default class Validator {

  static async getErrors(model, object): Promise<string[]> {
    const errorMessages = [];
    for (let i in model) {
      const field = model[i];
      for (let j in field) {
        const validation = field[j];
        const errorMessage = await validation.validator(object[i], validation.errorMessage, validation.param);
        if(errorMessage) {
          errorMessages.push(errorMessage);
        }
      }
    }
    return errorMessages;
  }
}