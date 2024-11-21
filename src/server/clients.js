'use server'

import { databaseHandler } from "@/database/factory.js"

export async function registerClient(info) {
    try {
        const dateArray = info.birth.split("/")
        const date = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`

        info.birth = date

        await databaseHandler.registerClient(info)

        return JSON.stringify({ ok: true, error: null })
    } catch (error) {
        return JSON.stringify({ ok: false, error })
    }
}

export async function editClient(id, info) {
    try {
        const client = await databaseHandler.findClientByPk(id)

        if (!client) throw new Error("Cliente não encontrado")

        const dateArray = info.birth.split("/")
        const date = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`

        info.birth = date

        await client.update(info)

        return JSON.stringify({ ok: true, error: null })
    } catch (error) {
        return JSON.stringify({ ok: false, error })
    }
}

export async function getAllClients(filter, page, limit) {
    try {
        const offset = (page - 1) * limit
        const result = await databaseHandler.findAllClients(filter, offset, limit)

        let pageCount = Math.ceil(result.count / limit)

        return JSON.stringify({ ok: true, error: null, clients: result.clients, pageCount })
    } catch (error) {
        return JSON.stringify({ ok: false, error })
    }
}

export async function getClient(id) {
    try {
        const result = await databaseHandler.findClientByPk(id)

        return JSON.stringify({ ok: true, error: null, client: result })
    } catch (error) {
        return JSON.stringify({ ok: false, error })
    }
}

export async function deleteClient(id) {
    try {
        const result = await databaseHandler.findClientByPk(id)

        await result.destroy()

        return JSON.stringify({ ok: true, error: null })
    } catch (error) {
        return JSON.stringify({ ok: false, error })
    }
}
