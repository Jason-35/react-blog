import { DataSource } from "typeorm"
import { User } from "../entities/User"
export const connectDB = (username: string, password: string, database: string): void => {
    const AppDataSource: DataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: username,
        password: password,
        database: database,
        entities: [User],
        synchronize: true,
    })

    AppDataSource.initialize()
    .then(() => {
        console.log("Connected to blogdb")
    })
    .catch((err) => {
        console.error("Couldn't connect to blogdb", err)
    })
}