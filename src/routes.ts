import { Router } from 'express';
import Device from './database/models/device';
import MeasurementTemperature from './database/models/measurements_temperature';
import MeasurementLight from './database/models/measurements_light';

const routes = Router();

routes.post('/measurements_temperature/create', (req, res) => {
	MeasurementTemperature.create(req.body).then((measurement) => {
		return res.json(measurement);
	});
});

routes.post('/measurements_light/create', (req, res) => {
	MeasurementLight.create(req.body).then((measurement) => {
		return res.json(measurement);
	});
});

export default routes;
