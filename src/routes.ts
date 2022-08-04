import { Router } from 'express';
import Device from './database/models/device';

const routes = Router();

routes.get('/', (req, res) => {
	Device.findByPk(1).then((device) => {
		console.log(device);
	});
	return res.json({ message: 'Hello World' });
});

export default routes;
