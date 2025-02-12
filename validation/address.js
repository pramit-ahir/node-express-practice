const Joi = require('joi')

function addAddressvalidation(req, res, next) {
    const addressSchema = Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required()
    })
    const { error } = addressSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            details: error.details.map((err) => err.message),
        })
    }
    next()
}

module.exports = { addAddressvalidation }