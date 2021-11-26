import AppUtility from '../../../utility';

import Service from '../../index';

class FlightPathProcessorService extends Service {
	get id() {
		throw Error('Not Implemented');
	}

	process(results, input, measurementUnits) {
		this._enforceNotNull('FlightPathProcessorService', 'process', results, 'results');
		this._enforceNotNull('FlightPathProcessorService', 'process', input, 'input');
		this._enforceNotEmpty('FlightPathProcessorService', 'process', measurementUnits, 'measurementUnits');

		this._data = new FlightPath();

		this._processInput(input);

		const path = [];
		const divisor = (measurementUnits === AppUtility.measurementUnitEnglish ? 3.281 : 1);
		let previous = null;
		let data = this._data.rows.shift();
		results.info.launch = `${data.longitude},${data.latitude}`;
		while (data) {
			previous = data;
			path.push(`${data.longitude},${data.latitude},${this._round(data.altitude / divisor)}`);
			data = this._data.rows.shift();
			if (!data)
				results.info.touchdown = `${previous.longitude},${previous.latitude}`;
		}

		results.info.coords = path;
		results.info.flightPath = this._kml(results.info, path.join('\n'));

		return results;
	}

	_processInput(input) {
		throw Error('Not Implemented');
	}

	_publish(time, altitude, altitudeF, velocity, velocityF, apogee, noseOver, drogue, main, ground) {
		this._data.publish(time, altitude, altitudeF, velocity, velocityF, apogee, noseOver, drogue, main, ground);
	}

	_round(value, places = 2) {
		return Number(value.toFixed(places));
	}

	_reverseRgb(str) {
		return str.replace('#', '').split('').reverse().join('');
	}

	_kml(flightInfo, data) {
		this._enforceNotNull('FlightPathProcessorService', '_kml', flightInfo, 'flightInfo');
		this._enforceNotNull('FlightPathProcessorService', '_kml', data, 'data');

		flightInfo.style.path.flight.color = this._reverseRgb(flightInfo.style.path.flight.color);
		flightInfo.style.path.ground.color = this._reverseRgb(flightInfo.style.path.ground.color);
		flightInfo.style.pin.launch.color = this._reverseRgb(flightInfo.style.pin.launch.color);
		flightInfo.style.pin.touchdown.color = this._reverseRgb(flightInfo.style.pin.touchdown.color);

		let temp;
		let pins = '';
		if (flightInfo.launch) {
			temp = AppUtility.$t('flightPath.launch');
			pins += `
			<Placemark>
				<name><![CDATA[${temp}]]></name>
				<Style id="normalPlacemark">
					<IconStyle>
						<color>ff${flightInfo.style.pin.launch.color}</color>
					</IconStyle>
				</Style>
				<Point>
					<coordinates>
${flightInfo.launch}
					</coordinates>
				</Point>
			</Placemark>`;
		}
		if (flightInfo.touchdown) {
			temp = AppUtility.$t('flightPath.touchdown');
			pins += `
			<Placemark>
				<name><![CDATA[${temp}]]></name>
				<Style id="normalPlacemark">
					<IconStyle>
						<color>ff${flightInfo.style.pin.touchdown.color}</color>
					</IconStyle>
				</Style>
				<Point>
					<coordinates>
${flightInfo.touchdown}
					</coordinates>
				</Point>
			</Placemark>`;
		}

		let description = '';
		if (flightInfo.date || flightInfo.location) {
			const temp2 = [];
			if (flightInfo.date)
				temp2.push(flightInfo.date.toLocaleString());
			if (flightInfo.location) {
				temp2.push('@');
				temp2.push(flightInfo.location);
			}
			description = `<description><![CDATA[${temp2.join(' ')}]]></description>`;
		}

		let name = flightInfo.title;
		if (String.isNullOrEmpty(name))
			name = '';
		name += ' ' + AppUtility.$t('flightPath.flightPath')

		return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
	<Document>
		<name><![CDATA[${name}]]></name>
		${description}
		<visibility>1</visibility>
		<open>1</open>
		<Folder id="Tracks">
			<name>Tracks</name>
			<visibility>1</visibility>
			<open>0</open>${pins}
			<Placemark>
				<name><![CDATA[${AppUtility.$t('flightPath.flightPath')}]]></name>
				<Style>
					<LineStyle>
						<color>ff${flightInfo.style.path.flight.color}</color>
						<width>4</width>
					</LineStyle>
				</Style>
				<MultiGeometry>
					<LineString>
						<tessellate>0</tessellate>
						<altitudeMode>absolute</altitudeMode>
						<coordinates>
${flightInfo.coords}
						</coordinates>
					</LineString>
				</MultiGeometry>
			</Placemark>
			<Placemark>
				<name><![CDATA[${AppUtility.$t('flightPath.groundPath')}]]></name>
				<Style>
					<LineStyle>
						<color>ff${flightInfo.style.path.ground.color}</color>
						<width>4</width>
					</LineStyle>
				</Style>
				<MultiGeometry>
					<LineString>
						<tessellate>0</tessellate>
						<altitudeMode>clampToGround</altitudeMode>
						<coordinates>
${flightInfo.coords}
						</coordinates>
					</LineString>
				</MultiGeometry>
			</Placemark>
		</Folder>
	</Document>
</kml>`;
	}
}

class FlightPath {
	constructor() {
		this._rows = [];
	}

	get rows() {
		return this._rows;
	}

	publish(time, altitude, latitude, longitude, velocityH, velocityV) {
		this._rows.push({
			altitude: Number(altitude),
			latitude: Number(latitude),
			longitude: Number(longitude),
			time: Number(time),
			velocityV: Number(velocityV),
			velocityH: velocityH ? Number(velocityH) : null
		});
	}
}

export default FlightPathProcessorService;
