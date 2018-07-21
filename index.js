const axios = require ('axios');
const crypto = require('crypto');

let __this;

let icoBench = function(publicKey, privateKey){
	this.publicKey = publicKey;
	this.privateKey = privateKey;
	this.apiUrl = 'https://icobench.com/api/v1/';
	this.hmacAlgorithm = 'sha384';
	this.calls = {
		all: 'icos/all',
		pall: 'people/all',
		expert: 'people/expert',
		profile: 'ico/',
		ratings: 'icos/ratings',
		registered: 'people/registered',
		stats: 'other/stats',
		trending: 'icos/trending',
		filters: 'icos/filters',
	}
	__this = this;
};


// Private Functions 
let buildUrl = function(ctx, call, appendToUrl) {
	// Check if a string needs to be added to URL
	appendToUrl = appendToUrl || '';
	return ctx.apiUrl + ctx.calls[call] + appendToUrl;
}

let signRequest = function(ctx, json){
	// Create HMAC
	let hmac = crypto.createHmac(ctx.hmacAlgorithm, ctx.privateKey);
	
	// Create HMAC Digest
	hmac.update(json);
	
	// return Base64 encoding of HMAC
	return hmac.digest('base64');
}

var sendRequest = async function(ctx, url, data){
	try {
		// Get JSON representation
		let json = JSON.stringify(data);

		// Sign JSON
		let signedData = signRequest(ctx, json);
		let config = {
			timeout: 5000,
			headers: {
				'X-ICObench-Key': ctx.publicKey,
				'X-ICObench-Sig': signedData,
				'Content-Type': 'application/json',
				'Content-Length': data.length
			 }
		};

		let response = await axios.post(url,  json, config);
		if (response.status == 200) {
			return response.data;
		} else {
			throw('Error on API request: ' + response);
		}
	} catch (e) {
		console.log(e);
	}
}

let createApiRequest = async function(ctx, callee, data, appendToUrl){
	data = data || "";
	let finalUrl = buildUrl(__this, callee, appendToUrl);
	return await sendRequest(__this, finalUrl, data);
}


// icoBench Object Prototype - Public Functions
icoBench.prototype = {
	icos: {
		all: async function(data){
			return await createApiRequest(__this, arguments.callee.name, data);
		},
		filters: async function(data){
			return await createApiRequest(__this, arguments.callee.name, data);
		},
		ratings: async function(data){
			return await createApiRequest(__this, arguments.callee.name, data);
		},
		trending: async function(data){
			return await createApiRequest(__this, arguments.callee.name, data);
		}
	},
	ico: {
		profile: async function(data) {
			if (data && data.ico) {
				return await createApiRequest(__this, arguments.callee.name, data, data.ico);
			} else {
				throw('Parameter "ico" required, with a String value of id or url');
			}
		}
	},
	people: {
		all: async function(data){
			return await createApiRequest(__this, 'pall', data);
		},
		expert: async function(data){
			return await createApiRequest(__this, arguments.callee.name, data);
		},
		registered: async function(data){
			return await createApiRequest(__this, arguments.callee.name, data);
		}
	},
	stats: async function(data) {
		return await createApiRequest(__this, arguments.callee.name, data);
	}
}

module.exports = icoBench;
