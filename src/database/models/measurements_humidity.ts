import Sequelize from 'sequelize';
import connection from '../connection';
import Greenhouse from './greenhouse';

const MeasurementHumidity = connection.define('measurement_humidity', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER,
	},
	humidity: Sequelize.DOUBLE,
	greenhouseId: {
		field: 'FK_greenhouses_id',
		type: Sequelize.INTEGER,
		references: {
			model: Greenhouse,
			key: 'id',
		},
	},
});

export default MeasurementHumidity;
