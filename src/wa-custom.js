"use strict"
/* 
Class name: CustomWA
======================

Attributes:
 - public url : String (read-only): the initial url to WhatsApp API.
 - public code : Number (read-only): the country code, defined when the instance is created. By default is 1 (EE.UU code).
 - public number : Number (read-only): the phone number, without country code, defined when the instance is created. By default is null.
 - public phone: Number (read-only): the phone number, with country code, created from properties 'code' & 'number'. It hasn't default value.
*/
class CustomWA {
	constructor (codeCountry = 1, phoneNumber = null) {
		try{
			// Define necessary values
			this._waURL = 'https://api.whatsapp.com/send?';
			this._code = validNumber(codeCountry, {
				name: 'code',
				length: {min: 1, max: 3}
			});
			this._phone = validNumber(phoneNumber, {
				name: 'phone',
				length: 10
			});
		} catch (e) {
			console.error(e);
		}
	}
	// Getters
	// ------------------

	// Return parent url
	get url () {
		return this._waURL;
	}
	// Return code country digit
	get code () {
		return this._code;
	}
	// Return phone number with NO country code
	get number () {
		return this._phone;
	}
	get phone () {
		return Number(`${this.code}${this.number}`);
	}
	// Public Methods
	// ------------------
}

/* Other functions
   ==================
	- Number: validNumber (value, options): Returns the number after check is valid. Else, throws an datatype error.
*/
// Return value after check is valid, else throws an error
function validNumber (value = null, options = {name: 'unknown',	length: null}) {
		// Check if datatype of number is valid
		if (typeof value !== 'number'){
			throw `Sorry, '${value}' has an invalid datatype on parameter '${options.name}'.`;
		} else if (value < 0) {
			throw `Sorry, '${value}' is an invalid country code.`
		} else {
			// Check if length option is defined & which value is it
			switch (typeof options.length) {
				case 'null':
					return value;
				case 'undefined':
					return value;
				case 'number':
					if (options.length === value.toString().length) {
						return value;
					} else {
						throw `Sorry, ${value} is an invalid length of value on parametter '${options.name}'.`;
					}
				case 'object':
					var counter = 0;
					for(let property in options.length){
						switch (property) {
							case 'min':
								if (value.toString().length >= options.length[property]) {counter++;} else {counter--;}
								break;
							case 'max':
								if (value.toString().length <= options.length[property]) {counter++;} else {counter--;}
								break;
							default:
								throw `Sorry, '${property }' is an invalid parametter from 'length' property in options on ${options.name}.`;
						}
					}
					if (counter > 0) {
						return value;
					} else {
						throw `Sorry, ${value} is an invalid length of value on parametter '${options.name}'`;
					}
					break;
			}
		}
	}