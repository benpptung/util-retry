A thin and lightweight utilty to wrap an async function and makes it retryable. If all retires failed, the `last attampt error` will be sent back. 

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

- `options`: `<Number>|<Object>`
  - times: Unsigned int. Retry limitation. Default: 3.
  - wait : Milliseconds. The interval time to wait between retries. Default: 0
  
  If options is a number, it means `times`
  
- `task`

  Normal async function, nodejs style callback is always the last argument.
 