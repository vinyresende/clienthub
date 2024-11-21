import bcrypt from "bcryptjs"
import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"

import { databaseHandler } from "@/database/factory.js"

const SECRET = process.env.NEXTAUTH_SECRET

const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Nome de usuário', type: 'text', placeholder: 'Digite o nome de usuário' },
                password: { label: 'Senha', type: 'password', placeholder: 'Digite a senha' }
            },

            async authorize(credentials, req) {
                let user = await databaseHandler.getUserByName(credentials.username)

                if (!user) throw new Error('Nome de usuário ou senha incorretos!')

                let isValid = bcrypt.compareSync(credentials.password, user.password)

                if (isValid) {
                    return user
                } else {
                    throw new Error('Nome de usuário ou senha incorretos!')
                }
            },
        })
    ],
    pages: {
        signIn: '/auth/login'
    },
    secret: SECRET,
    session: {
        jwt: true
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
