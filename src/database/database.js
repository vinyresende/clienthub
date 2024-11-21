import postgreSQL from "pg"
import { Sequelize } from "sequelize"

const database = new Sequelize(
    process.env.POSTGRES_URL,
    {
        dialect: "postgres",
        dialectModule: postgreSQL,
        logging: false
    }
)

export default database
