class Validator {
  constructor(Joi, validate) {
    this.Joi = Joi;
    this.validate = validate;
  }

  async save(body) {
    const schema = this.Joi.object().keys({
      title: this.Joi.string().max(100).required(),
      description: this.Joi.string().max(400).required(),
      text: this.Joi.string().required(),
    });

    return this.validate(schema, body);
  }
}

module.exports = Validator;
