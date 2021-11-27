// TODO: replace with library dependency
class Service {
	_enforce(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			console.error(`${clazz}.${method} Invalid ${name}`);
			const error = Error(`Invalid ${name}`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotEmpty(clazz, method, value, name, correlationId) {
		if (String.isNullOrEmpty(value)) {
			console.error(`${clazz}.${method} ${name} is empty.`);
			const error = Error(`Invalid ${name}`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}

	_enforceNotNull(clazz, method, value, name, correlationId) {
		if (!value) {
			console.error(`${clazz}.${method} ${name} is null.`);
			const error = Error(`Invalid ${name}`, true);
			error.correlationId = correlationId;
			throw error;
		}
	}
}

export default Service;
