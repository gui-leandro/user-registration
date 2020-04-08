const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const UserControler = require('./controllers/UserController')

const routes = express.Router()

routes.get('/', UserControler.index)

routes.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required().min(10).max(11),
    })
}), UserControler.create)

routes.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), UserControler.delete)

module.exports = routes