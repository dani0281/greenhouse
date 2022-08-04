import express from 'express';
import { Sequelize } from 'sequelize';
import connection from './database/connection';

import routes from './routes';

class App {
	public server;
	public db: Sequelize;

	constructor() {
		this.server = express();

		this.middlewares();
		this.routes();
		this.database();
	}

	middlewares() {
		this.server.use(express.json());
	}

	routes() {
		this.server.use(routes);
	}

	async database() {
		this.db = connection;

		try {
			await this.db.authenticate();
			console.log('Connection has been established successfully!');
		} catch (error) {
			console.log('Unable to connect to the database', error);
		}
	}
}

export default new App().server;
