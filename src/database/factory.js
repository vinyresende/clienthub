import sequelize from "sequelize"
import database from "./database.js"

import { User, Client } from "./models.js"

class DatabaseFactory {
    constructor() {
        this.database = database
        this.database.sync()
    }

    // Encontra um usuário pelo username
    async getUserByName(name) {
        const user = await User.findOne({ where: { name } })

        return user ?? null
    }

    // Registra um usuário
    async registerUser(name, password) {
        try {
            await User.create({
                name,
                password
            })
    
            return { ok: true, error: null }
        } catch (error) {
            return { ok: false, error }
        }
    }

    // Encontra um cliente pelo id
    async findClientByPk(id) {
        const client = await Client.findByPk(id)

        return client ?? null
    }

    // Encontra todos os clientes
    async findAllClients(filter="", offset=undefined, limit=10) {
        const clients = await Client.findAndCountAll({ where: sequelize.literal(
            `(id::TEXT ILIKE '%${filter}%' OR name ILIKE '%${filter}%' OR cpf ILIKE '%${filter}%')`
        ), limit, offset}
    )

        return { clients: clients.rows, count: clients.count }
    }

    // Registra um cliente
    async registerClient(info) {
        try {
            await Client.create(info)

            return { ok: true, error: null }
        } catch (error) {
            return { ok: true, error }
        }
    }
}

const databaseHandler = new DatabaseFactory()

export { databaseHandler }
