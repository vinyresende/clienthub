import database from "./database.js"
import { DATEONLY, INTEGER, STRING, TEXT } from "sequelize"

const User = database.define(
    "user", {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            allowNull: false
        },
        password: {
            type: STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        updatedAt: false,
        createdAt: false
    }
)

const Client = database.define(
    "client", {
        id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            allowNull: false
        },
        cpf: {
            type: STRING,
            allowNull: false
        },
        rg: {
            type: STRING,
            allowNull: false
        },
        note: {
            type: STRING,
            allowNull: true
        },
        address: {
            type: TEXT,
            allowNull: true
        },
        phone: {
            type: STRING,
            allowNull: true
        },
        birth: {
            type: DATEONLY,
            allowNull: false
        }
    },
    {
        timestamps: false,
        updatedAt: false,
        createdAt: false
    }
)

export { User, Client }
