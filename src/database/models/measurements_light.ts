import Sequelize from 'sequelize';
import connection from '../connection';
import Greenhouse from './greenhouse';

const MeasurementLight = connection.define('measurement_light', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER,
	},
	lightOn: {
        type: Sequelize.BOOLEAN,
        field: 'light_on'
    },
	greenhouseId: {
		field: 'FK_greenhouses_id',
		type: Sequelize.INTEGER,
		references: {
			model: Greenhouse,
			key: 'id',
		},
	},
});

export default MeasurementLight;
