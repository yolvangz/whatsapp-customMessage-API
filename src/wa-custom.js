"use strict"
/* 
Class name: waCustom
======================

Attributes:
 - private url (read-only): the initial url to WhatsApp API.
 - public code (read-only): the country code, defined when the instance is created. By default is 1 (EE.UU code).
*/
export default class waCustom {
	constructor (codeCountry = 1) {
		this._waURL = 'https://api.whatsapp.com/send?';
		if (typeof codeCountry === 'number') {
			this._code = codeCountry;
		} else {
			throw "Sorry, invalid datatype on parameter 'code'";
		}
	}
	get url () {
		return this._waURL;
	}
	get code (){
		return this._code;
	}
}