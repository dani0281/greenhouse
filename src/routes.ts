import { Router } from 'express';
import MeasurementTemperature from './database/models/measurements_temperature';
import MeasurementLight from './database/models/measurements_light';

const routes = Router();

routes.get('/measurements_temperature/get', (req, res) => {
	MeasurementTemperature.findAll().then((measurementTemp) => {
		return res.json(measurementTemp);
	})
});

routes.get('/measurements_light/get', (req, res) => {
	MeasurementLight.findAll().then((measurementLight) => {
		return res.json(measurementLight);
	})
});

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
