const { celebrate, Joi } = require("celebrate")
module.exports.userCreateValidation = celebrate({
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        mobile: Joi.number().required(),
        DOB: Joi.string().required(),
        address: Joi.string().required(),
        role: Joi.number()

    })
})
module.exports.userAddValidation = celebrate({
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
                password: Joi.string().required(),

        mobile: Joi.number().required(),
        DOB: Joi.string(),
        address: Joi.string().required(),
        image: Joi.string(),
        role: Joi.string()









    })
})

