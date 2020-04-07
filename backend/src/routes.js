const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const UserControler = require('./controllers/UserController')

const routes = express.Router()

routes.get('/users', UserControler.index)

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required().min(10).max(11),
    })
}), UserControler.create)

routes.delete('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), UserControler.delete)

module.exports = routes