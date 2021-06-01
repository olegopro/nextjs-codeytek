import validator from 'validator'
import { isEmpty } from 'lodash'

const validateAndSanitizeLoginForm = data => {
	let errors = {}
	let sanitizedData = {}

	data.username = !isEmpty(data.username) ? data.username : ''
	data.password = !isEmpty(data.password) ? data.password : ''

	const addErrorAndSanitizedData = (fieldName, errorContent, min, max, type = '', required) => {
		if (!validator.isLength(data[fieldName], { min, max })) {
			errors[fieldName] = `${errorContent} must be ${min} to ${max} characters`
		}

		if (required && validator.isEmpty(data[fieldName])) {
			errors[fieldName] = `${errorContent} is required`
		}

		// If no errors
		if (!errors[fieldName]) {
			sanitizedData[fieldName] = validator.trim(data[fieldName])
			sanitizedData[fieldName] = validator.escape(sanitizedData[fieldName])
		}
	}

	addErrorAndSanitizedData('username', 'Username', 2, 35, 'string', true)
	addErrorAndSanitizedData('password', 'Password', 2, 35, 'string', true)

	return {
		sanitizedData,
		errors,
		isValid: isEmpty(errors)
	}
}

export default validateAndSanitizeLoginForm
