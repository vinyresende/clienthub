import bcrypt from "bcryptjs/dist/bcrypt"

import { apiAuth } from "@/api"
import { NextResponse } from "next/server"
import { databaseHandler } from "@/database/factory.js"

async function handler(req) {
    try {
        if (!apiAuth(req)) {
            return NextResponse.json({
                ok: false, 
                error: "Você precisa de uma chave de API válida para acessar essa rota!" 
            },
            { status: 403 })
        }
    
        const data = await req.json()
    
        if (!data.username || !data.password) {
            return NextResponse.json({
                ok: false,
                error: "Faltam dados para registro do usuário!"
            },
            { status: 400 })
        }
    
        if (await databaseHandler.getUserByName(data.username)) {
            return NextResponse.json({}, { status: 409 })
        }
    
        const hashedPass = await bcrypt.hash(data.password, 10)
    
        const user = await databaseHandler.registerUser(data.username, hashedPass)
    
        return NextResponse.json({
            ok: true,
            username: user.name,
            message: "Usuário registrado com sucesso!"
        },
        { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ ok: false, error: "Houve um erro interno!" }, { status: 500 })
    }
}

export { handler as POST }
