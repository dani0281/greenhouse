import Sequelize from 'sequelize';
import connection from '../connection';
import Greenhouse from './greenhouse';

const MeasurementTemperature = connection.define('measurement_temperature', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: Sequelize.INTEGER,
	},
	temperature: Sequelize.DOUBLE,
	registeredDate: Sequelize.DATE,
	greenhouseId: {
		field: 'FK_greenhouses_id',
		type: Sequelize.INTEGER,
		references: {
			model: Greenhouse,
			key: 'id',
		},
	},
});

export default MeasurementTemperature;
