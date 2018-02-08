# node-icobench
A simple Node.js wrapper for the ICOBench.com API


## Installation
`npm install node-icobench`


## Usage
### Initializing
 ```js 
 
const ICOBench = require('node-icobench');

// Use the public and private keys you received on icobench.com
const pubKey = '1234';
const prikey = 'abcd';

let icobench = new ICOBench(pubKey, prikey);
```

### API Examples
The wrapper returns a promise for all request types, so you can use `Promise.then()` or `async/await` to get the results
```js
// Get all ICOs
icobench.icos.all();

// Get page 32 from all ICOs results
icobench.icos.all({page: 32});

// Get registered ICOBench members
icobench.people.registered();

// Get trending ICOs
icobench.icos.trending();

// Get more information on an ICO
icobench.ico.profile({id: 678});



// Use with Promise.then()

icobench.people.all().then(function(response) {
  // print number of people
  console.log(response.people);
  
  // iterate all people
  for (let item of response.results) {
    // print person name
    console.log(item.name);
  }
});


// Use with async function 

(async function() {
  let stats =  await icobench.stats();
  // Print number of ICOs
  console.log(stats.icos);
})();


```

### API Reference
This table maps the original API to the wrapper functions.  
Please note that all parameters are passed as an `Object` to the function.  
Example: get page 2 of all icos: `icobench.icos.all({page: 2})`

| Original API        | Wrapper                   | Parameters             |
|---------------------|---------------------------|------------------------|
| /icos/all           | icobench.icos.all         | optional               |
| /icos/filters       | icobench.icos.filters     | optional               |
| /icos/trending      | icobench.icos.trending    | optional               |
| /icos/ratings       | icobench.icos.ratings     | optional               |
| /ico/{id &#124; url}| icobench.ico.profile      | Object: {id: [ICO ID]} |
| /people/{all}       | icobench.people.all       | optional               |
| /people/{expert}    | icobench.people.expert    | optional               |
| /people/{registered}| icobench.people.registered| optional               |
| /other/stats        | icobench.stats            | optional               |
