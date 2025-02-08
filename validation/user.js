const Joi = require('joi');

function addUserValidation(req, res, next) {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        phoneNumber: Joi.string()
            .pattern(/^\+?[1-9]\d{1,14}$/)
            .required(),
        birthDate: Joi.date().optional(),
        gender: Joi.string().valid('male', 'female', 'other').required(),
        password: Joi.string()
            .min(8)
            .max(128)
            .required(),
    })

    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            details: error.details.map((err) => err.message),
        })
    }
    next()
}

function loginValidation(req, res, next) {
    const login = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const { error } = login.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'validation error',
            details: error.details.map((err) => err.message),
        })
    }
    next()
}

function updateUserValidation(req, res, next) {
    const update = Joi.object({
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().min(2).max(50),
        phoneNumber: Joi.string()
            .pattern(/^\+?[1-9]\d{1,14}$/),
        birthDate: Joi.date().optional(),
        gender: Joi.string().valid('male', 'female', 'other'),
    })
    const { error } = update.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'validation error',
            details: error.details.map((err) => err.message),
        })
    }
    next()
}

function userListValidation(req, res, next) {
    const userList = Joi.object({
        email: Joi.string(),
        gender: Joi.string().valid('male', 'female', 'other'),
        page: Joi.number(),
        limit: Joi.number()
    })

    const { error } = userList.validate(req.query, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            details: error.details.map((err) => err.message),
        })
    }
    next()
}

module.exports = { addUserValidation, loginValidation, updateUserValidation, userListValidation }
