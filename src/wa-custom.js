"use strict"
/* 
Class name: CustomWA
======================

Attributes:
 - public String : url (read-only): the initial url to WhatsApp API.
 - public Number : code read-only): the country code, defined when the instance is created. By default is 1 (EE.UU code).
 - public Number : number (read-only): the phone number, without country code, defined when the instance is created. By default is null.
 - public Number : phone (read-only): the phone number, with country code, created from properties 'code' & 'number'. It hasn't default value.
 - public Number : limit (read-only): the limit of characters allowed into the field text, change this value could generates errors in the URL generation.
Methods:
 - public String : createLink(String: text): Return a custom WhatsApp link, with a custom number phone number defined by the instance properties & an custom text (optional).
 - public Null : sendLink(String: text): It runs the method createLink() & just send the got URL to another browser's window.
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
			this._limit = 300;
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
	// Return the phone number, with country code
	get phone () {
		return Number(`${this.code}${this.number}`);
	}
	// Return the max length of characters allowed in the message.
	get limit() {
		return this._limit;
	}
	// Public Methods
	// ------------------

	/*
		Return a custom WhatsApp link, with a custom number phone
		number defined by the instance properties & an custom text
		passed by a parameter (optional)
	*/
	createLink (text = null) {
		// Check the datatype of text
		switch (typeof text) {
			// Text was not defined, so return the complete URL (with no text defined)
			case 'null':
				return encodeURI(`${this.url}phone=${this.phone}`);
			// text maybe is an object
			case 'object':
				// Break if it's really an object, not an array
				if (!Array.isArray(text)) {
					throw 'Text is an object';
					break;
				}
			// Default case for else datatypes (String, Number, Boolean, Array)
			default:
				// Codify the given text & keep it on a variable
				let codedText = encodeURI(text);
				// Check if text is too large, so throw an error. Else, return the complete URL
				if (codedText.length > this.limit) {
					throw 'Sorry, message is too large :(';
					break;
				} else {
					return `${this.url}phone=${this.phone}&text=${codedText}`;
				}
		}
	}
	/*
		It runs the method createLink() & just send the got URL to another browser's window.
	*/
	sendLink (text = undefined) {
		const WAlink = this.createLink(text);
		window.open(WAlink);
	}
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
			// Check if length option is defined & which value is it.
			switch (typeof options.length) {
				// Options are not defined.
				case 'null':
					return value;
				// Options are defined, but length property not.
				case 'undefined':
					return value;
				// value must has the exact given length (fixed number)
				case 'number':
					// If value is VALID, return. Else, is INVALID & throws an error.
					if (options.length === value.toString().length) {
						return value;
					} else {
						throw `Sorry, ${value} is an invalid length of value on parameter '${options.name}'.`;
					}
				// Value must meet certain given criteria: min & max length
				case 'object':
					/*
						Create a variable called 'counter'.
						If any criteria is accomplished, counter sums a point. Else, rest a point.
						So, if counter is greater (1 || 2) than zero (0), criteria was accomplished & value is VALID.
						Else, if counter is less or equal (0 || -2) than zero, criteria was NOT accomplished $ value is INVALID.
						In case that as value as any parameters given are INVALID, throws an error.
					*/
					var counter = 0;
					// Loops throw the criteria parameters
					for(let property in options.length){
						// Check the criteria
						switch (property) {
							case 'min':
								if (value.toString().length >= options.length[property]) {counter++;} else {counter--;}
								break;
							case 'max':
								if (value.toString().length <= options.length[property]) {counter++;} else {counter--;}
								break;
							default:
								throw `Sorry, '${property}' is an invalid parameter from 'length' property in options on ${options.name}.`;
						}
					}
					if (counter > 0) {
						return value;
					} else {
						throw `Sorry, ${value} is an invalid length of value on parameter '${options.name}'`;
					}
					break;
			}
		}
	}