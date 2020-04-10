const genetateId = require('../utils/generateId')
const connection = require('../database/connection')

module.exports = {

    async index(req, res) {

        const users = await connection('users').select('*')

        const [count] = await connection('users').count()

        res.header('X-Total-Count', count['count(*)'])

        return res.json(users)
    },

    async create(req, res) {
        const { name, email, phone } = req.body
        
        const id = genetateId()

        await connection('users').insert({
            id,
            name,
            email,
            phone,
        })

        return res.json({ id }).send()
    },

    async delete(req, res) {
        const { id } = req.params

        const user = await connection('users')
            .where('id', id)
            .select('id')
            .first()
        
        if(user.id != id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('users').where('id', id).delete()
        return res.status(204).send()
    }
}