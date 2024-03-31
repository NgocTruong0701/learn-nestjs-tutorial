export const connection: Connection = {
    CONNECTION_STRING: 'mysql://localhost:3000',
    DB: 'mysql://localhost/database',
    DBNAME: 'nestfunction'
}

export type Connection = {
    CONNECTION_STRING: string;
    DB: string;
    DBNAME: string;
}