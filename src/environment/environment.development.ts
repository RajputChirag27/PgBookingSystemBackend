import {config} from 'dotenv'
config();

export const environment = {
    url : process.env.DB_URL,
    port : process.env.PORT,
    allowedAddress : process.env.ALLOWED_ADDRESS || 'http://localhost:4200',
}