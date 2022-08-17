import mqtt from 'mqtt';
import Device from './database/models/device';
import Greenhouse from './database/models/greenhouse';
import MeasurementLight from './database/models/measurements_light';
import MeasurementTemperature from './database/models/measurements_temperature';
import connection from './database/connection';
import MeasurementHumidity from './database/models/measurements_humidity';

const client = mqtt.connect('mqtt://192.168.1.2:1883', {
	connectTimeout: 35000,
	username: 'dk25',
	password: 'dk25Pass',
});

const temperatureTopic = 'temperature';
const lightTopic = 'light';
const humidityTopic = 'humidity';

const temperatureCallback = (deviceId: string, message: string) => {
	if (isNaN(Number(message))) return;

	Device.findOne({ where: { hostname: deviceId } }).then((device) => {
		if (device) {
			Greenhouse.findOne({ where: { deviceId: (device as any).id } }).then(
				(greenhouse) => {
					if (greenhouse) {
						MeasurementTemperature.create({
							greenhouseId: (greenhouse as any).id,
							temperature: Number(message),
						});
					}
				},
			);
		}
	});
};

const lightCallback = (deviceId: string, message: string) => {
	if (isNaN(Number(message))) return;

	Device.findOne({ where: { hostname: deviceId } }).then((device) => {
		if (device) {
			Greenhouse.findOne({ where: { deviceId: (device as any).id } }).then(
				(greenhouse) => {
					if (greenhouse) {
						MeasurementLight.create({
							greenhouseId: (greenhouse as any).id,
							lightOn: message === '1' ? true : false,
						});
					}
				},
			);
		}
	});
};

const humidityCallback = (deviceId: string, message: string) => {
	if (isNaN(Number(message))) return;

	Device.findOne({ where: { hostname: deviceId } }).then((device) => {
		if (device) {
			Greenhouse.findOne({ where: { deviceId: (device as any).id } }).then(
				(greenhouse) => {
					if (greenhouse) {
						MeasurementHumidity.create({
							greenhouseId: (greenhouse as any).id,
							humidity: Number(message),
						});
					}
				},
			);
		}
	});
};

interface Endpoint {
	key: string;
	topic: string;
	callback: (deviceId: string, message: string) => void;
}

const endpoints: Endpoint[] = [
	{
		key: temperatureTopic,
		topic: `${temperatureTopic}/+`,
		callback: temperatureCallback,
	},
	{ key: lightTopic, topic: `${lightTopic}/+`, callback: lightCallback },
	{
		key: humidityTopic,
		topic: `${humidityTopic}/+`,
		callback: humidityCallback,
	},
];

client.on('connect', async () => {
	try {
		await connection.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.log('Unable to connect to the database', error);
	}
});

endpoints.forEach((endpoint) => {
	console.log(`subscribing to ${endpoint.topic}`);
	client.subscribe(endpoint.topic);
});

client.on('message', (topic, buffer) => {
	const endpoint = endpoints.find((endpoint) => topic.startsWith(endpoint.key));

	if (endpoint) {
		const deviceId = topic.split('/')[1];
		const message = buffer.toString();
		endpoint.callback(deviceId, message);
	}
});
