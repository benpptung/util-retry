A thin and lightweight utilty to wrap an async function and makes it retryable. If all retires failed, the `last attampt error` will be sent back. 


# Example #1

```
const retry = require('util-retry');

var request = retry(api); // try calling api function 3 times

request({...options as required by the api}, callback );
```

# Example #2
```

const request = require('superagent');
const retry = require('util-retry');

test = retry(test);

// treat test function as it is 
test((err, res)=>{
  console.error(err):
  console.log(res.text);
});

function test(done){

  console.log('requesting...');
  request.get('http://localhost:3000').end(done);
}


```


# Other Examples

```
const retry = require('util-retry');

// try calling api function 5 times
var request = retry(5, api);

// same as above
var request = retry({times: 5}, api);

// set 10 seconds to wait between retries.
var request = retry({times: 5, wait: 10000}, api);

```


# retry([options], task)

- `options`: `<Number>|<Object>`
  - times: Unsigned int. Retry limitation. Default: 3.
  - wait : Milliseconds. The interval time to wait between retries. Default: 0
  
  If options is a number, it means `times`
  
- `task`

  Normal async function, nodejs style callback is always the last argument.
 