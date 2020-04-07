# Easy Router

![Easy Router Logo] (https://hanalabs-public-assets.s3.ap-south-1.amazonaws.com/easy-router/cover.png)

A declarative router library for express.js.

## Installation

Use the npm or yarn package manager to install the package.

```bash
#npm
npm i @vinayak2506/easy-router

#yarn
yarn add @vinayak2506/easy-router
```

## Usage

Start your expressjs server in `index.js`

```javascript
// index.js

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

Now import @vinayak2506/easy-router

```javascript
// index.js

// ...

const EasyRouter = require('@vinayak2506/easy-router')
```

This will expose `EasyRouter` class which we will use in our router declarations.

```javascript
// index.js

// ...

let router = new EasyRouter(express.Router())
```

Now, we can use the router instance to declare our routes

```javascript
// METHOD : GET
router.get('/fb-post', function(req, res) {
  // do your action
  return res.send(200).json({})
})

// METHOD : POST
router.post('/fb-post', function(req, res) {
  // do your action
  return res.send(200).json({})
})

// METHOD : PUT
router.put('/fb-post', function(req, res) {
  // do your action
  return res.send(200).json({})
})

// METHOD : PATCH
router.patch('/fb-post', function(req, res) {
  // do your action
  return res.send(200).json({})
})

// METHOD : DELETE
router.delete('/fb-post', function(req, res) {
  // do your action
  return res.send(200).json({})
})
```

 Currently, the library only supports `GET, POST, PUT, PATCH, DELETE` HTTP methods.

### Grouping

We can **group** routes, see below for example

```javascript
router.group({prefix:'/fb-post'}, function() {
  router.get('/', function(req, res) {
    // do your stuff
  })
  
  router.post('/', function(req, res) {
    // do your stuff
  })
})
```

### Middlewares

You need to register the middlewares using `registerMiddleware` before start using it.

```javascript
// single middleware registration
router.registerMiddleware('auth:jwt', JwtAuthenticationMiddleware)

// multiple middleware registration
router.registerMiddleware({
  'cors': CorsMiddleware,
  'csrf': CsrfMiddleware,
  'auth:jwt': JwtAuthenticationMiddleware,
  'auth:session': SessionAuthenticationMiddleware,
})
```

You can also group middlewares like below.

``` javascript
router.registerMiddleware({
  web: [ 'cors', 'csrf', 'auth:session', ],
  api: [ 'auth:jwt', ],
})
```

You can register the middleware anywhere, but it is always recommended to do it in the top before declaring the routes.

To use the middleware, you just need to pass the names.

``` javascript
// in group method
router.group({prefix:'/fb-post', middlewares: ['auth:jwt']}, function() {
  router.get('/', function(req, res) {
    // do your stuff
  })
  
  router.post('/', function(req, res) {
    // do your stuff
  })
})
```



## Security

If you discover any security related issues, please email [vinayaksarawagi25@gmail.com](mailto:vinayaksarawagi25@gmail.com) instead of using the issue tracker.

## License

The MIT License. Please see LICENSE.md for more information.