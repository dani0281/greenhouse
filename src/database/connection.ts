import { Sequelize } from "sequelize";

const connection = new Sequelize('greenhouse_db','root','dk25Pass', {
    host: '192.168.1.2',
    dialect: 'mariadb'
})

export default connection