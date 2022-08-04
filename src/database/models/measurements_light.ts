import Sequelize from "sequelize";
import connection from "../connection";
import Greenhouse from "./greenhouse";

const MeasurementLight = connection.define('measurements_light', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    lightOn: Sequelize.BOOLEAN,
    registeredDate: Sequelize.DATE,
    greenhouseId: {
        key: 'FK_greenhouses_id',
        type: Sequelize.INTEGER,
        references: {
            model: Greenhouse,
            key: 'id',
        },
    },
})

export default MeasurementLight