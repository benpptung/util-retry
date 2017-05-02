A very thin and lightweight utilty to wrap an async function and makes it retryable. If all retires failed, the `last attampt error` will be sent back. 

See also [util-asyncflow](https://www.npmjs.com/package/util-asyncflow) - an async functions control flow utility

# Example
```

const request = require('superagent');
const retry = require('util-retry');

restapi = retry(restapi);

// Treat restapi as it is. restapi will try 3 times before giving up
restapi((err, res)=>{
  console.error(err):
  console.log(res.text);
});

function restapi(done){

  console.log('requesting...');
  request.get('http://localhost:3000').timeout(10000).end(done);
}

```


# Other Examples

```
const retry = require('util-retry');

// simply wrap your api
var restapi = retry(restapi);

// try calling api function 5 times before giving up
var restapi = retry(5, restapi);

// same as above
var restapi = retry({times: 5}, restapi);

// set 10 seconds to wait between retries.
var restapi = retry({times: 5, wait: 10000}, restapi);

```


# retry([options], task)

`retry` will return a function behaves as the original `task` funciton is, except it will retry if error happened based on the `options`. For example, if the task callback(null, res1, res2..). It will callback(null, res1, res2) too. 

- `options`: `<Number>|<Object>`
  - times: Unsigned int. Retry limitation. Default: 3.
  - wait : Milliseconds. The interval time to wait between retries. Default: 0
  
  If options is a number, it means `times`
  
- `task`: `<Function>`

  async function.
  

 