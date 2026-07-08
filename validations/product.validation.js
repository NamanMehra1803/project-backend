const { celebrate, Joi, errors, segments } = require("celebrate")
module.exports.productCreateValidation = celebrate ({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        cat_id: Joi.string().required(),
        price: Joi.number().required(),
        role: Joi.number().required(),
        iamge: Joi.number()


    })
})