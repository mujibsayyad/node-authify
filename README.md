# node-authify

### Authentication Library for MERN Stack

This is a simple library for implementing authentication in a MERN (MongoDB, Express, React, Node.js) stack.

The `node-authify` library provides an authentication middleware function called `checkAuth`. This middleware function takes a secret key as input and verifies the authenticity of the token passed in the header of the HTTP request.

The library uses the jsonwebtoken package to decode and verify the token. If the token is invalid or missing, the middleware function returns a 401 unauthorized error response with an appropriate message.

The `checkAuth` middleware function can be used in any ExpressJS application to secure routes that require authentication. It is easy to use and does not require any additional configuration. Simply pass the secret key as an argument to the middleware function, and it will take care of the rest.

Another point to mention in the library overview would be that upon successful verification of the JWT token, the checkAuth middleware adds the decoded token as a property `user` to the `req` object. This allows the user's information to be accessed in subsequent middleware or route handlers, enabling the implementation of role-based access control or other forms of user authentication.

Overall, the `node-authify` library provides a simple and effective way to add authentication to your ExpressJS applications using JWT tokens.

Overall, this library provides a simple and easy-to-use authentication solution for MERN stack applications, allowing developers to implement auth middleware without writing extra code.

## Use

Step 1: Add `secret-key` in your .env file
EX. SECRETKEY = SOMERANDOMEKEYHARDTOGUESS

Step 2: Pass this SECRETKEY in checkAuth(process.env.SECRETKEY)

```bash
// inside protected routes

const express = require('express');
const router = express.Router();

const checkAuth = require('node-authify');

router.use(checkAuth('secret-key'));

router.delete('/delete/:id', deleteUserById);
```

After succesfull verification you can access users information. You can perform authorization task based on this.

```bash

const userId = req.user.userId;

if (todo.user.toString() !== userId) {
    return res.status(401).json({ message: 'Unauthorized' });
}

```

This library is currently in beta mode and actively under development to add more features, improve performance, and address any issues reported during testing. Feedback from users testing the library is appreciated.
