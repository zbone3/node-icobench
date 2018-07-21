let assert = require('chai').assert;
let ICOBench = require('../index');


// Use the public and private keys you received on icobench.com
const pubKey = '';
const priKey = '';

let icobench = new ICOBench(pubKey, priKey);


let returnAtLeastOne = function(data) {
	return assert.isAtLeast(data.results.length, 1);
}

let returnType = function(data, type) {
	return assert.typeOf(data, type);
}


describe('API Test', function(){
	describe('API Keys', function() {
		it('should be a valid public API Key', function() {
			assert.equal(pubKey.length, 36)
		})
		
		it('should be a valid private API Key', function() {
			assert.equal(priKey.length, 36)
		})
	})
	describe('Specific ICO Profile', function() {
		let specificProfile;
		let profileId = 123;
		
		before(async function() {
			specificProfile = await icobench.ico.profile({ico: profileId});
		})
		
		it('should return profile ' + profileId, function() {
			assert.equal(specificProfile.id, profileId);
		})
		
	})
	
	describe('ICO ratings', function() {
		let ratings;
		
		before(async function() {
			ratings = await icobench.icos.ratings();
		})
		it('should be of type Object', function() {
			returnType(ratings, 'object');
		})
		
		it('should include at least one object in result array', function(){
			returnAtLeastOne(ratings);
		})
	})
		
	describe('Trending ICOs', function() {
		let trending;
		
		before(async function() {
			trending = await icobench.icos.ratings();
		})
		it('should be of type Object', function() {
			returnType(trending, 'object');
		})
		
		it('should include at least one object in result array', function(){
			returnAtLeastOne(trending);
		})
	})
		
	describe('ICOs Stats', function() {
		let stats;
		
		before(async function() {
			stats = await icobench.stats();
		})
		it('should be of type Object', function() {
			returnType(stats, 'object');
		})
		
		it('should have icos key of type number', function() {
			returnType(stats.icos, 'number');
		}) 

	})
	
	describe('ICOs Filters', function() {
		let stats;
		
		before(async function() {
			filters = await icobench.filters();
		})
		it('should be of type Object', function() {
			returnType(filters, 'object');
		})
		

	})
	
	describe('All ICOs', function() {
		let allIcos;
		let specificPage;
		let page =  parseInt(Math.random() * 30) + 1;
		
		before(async function() {
			allIcos = await icobench.icos.all();
			specificPage = await icobench.icos.all({page: page});
		})
		
		it('should be of type Object', function() {
			returnType(allIcos, 'object');
		})
		
		it('should include at least one object in result array', function(){
			returnAtLeastOne(allIcos);
		})
		
		it('should return page ' + page, function() {
			assert.equal(specificPage.currentPage, page);
		})
		
	});
	
	describe('People', function() {		
		let allPeople;
		let expertPeople;
		let registeredPeople;
		
		before(async function() {
			allPeople = await icobench.people.all();
			expertPeople = await icobench.people.expert();
			registeredPeople = await icobench.people.registered();
		})
		
		it('should include at least one object in all people result array', function(){
			returnAtLeastOne(allPeople);
		})
		
		it('should include at least one object in expert people result array', function(){
			returnAtLeastOne(expertPeople);
		})
		
		it('should include at least one object in registered people result array', function(){
			returnAtLeastOne(registeredPeople);
		})
	});
	
})