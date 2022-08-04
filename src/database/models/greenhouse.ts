import Sequelize from "sequelize";
import connection from "../connection";
import Device from "./device";

const Greenhouse = connection.define('greenhouses', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    deviceId: {
        key: 'FK_devices_id',
        type: Sequelize.INTEGER,
        references: {
            model: Device,
            key: 'id',
        },
    }
})

export default Greenhouse