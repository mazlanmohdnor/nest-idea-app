import { join } from "path";

export const environment = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "testuser",
    password: "testuser",
    database: "nestjs",
    synchronize: true,
    logging: true,
    entities: [
        join(__dirname, '**/**.entity{.ts,.js}')
    ]
}
