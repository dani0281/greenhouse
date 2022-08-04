import Sequelize from "sequelize";
import connection from "../connection";

const Device = connection.define('devices', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    hostname: Sequelize.STRING
})

export default Device