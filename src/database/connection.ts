import { Sequelize } from 'sequelize';

const connection = new Sequelize('greenhouse_db', 'dk25', 'dk25Pass', {
	host: '192.168.1.2',
	dialect: 'mariadb',
	port: 3306,
});

export default connection;
