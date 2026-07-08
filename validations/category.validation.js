const { celebrate, Joi, errors, segments } = require("celebrate")
module.exports.categoryCreateValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string()

    })
})
