# node-authify

### Authentication Library for MERN Stack

This is a simple library for implementing user authentication in a MERN (MongoDB, Express, React, Node.js) stack. It uses JWT (JSON Web Tokens) for authentication and authorization.

## Integration

Secure your React.js application with ease using [react-authify](https://www.npmjs.com/package/react-authify), a library that provides ready-to-use authentication components.

## Installation

To install the library, use npm or yarn:

```bash
npm install node-authify
```

```bash
yarn add node-authify
```

## Usage

Step 1: Create a `.env` file and add `secretkey` for JWT token.
`Ex. SECRETKEY = SOMERANDOMEKEYHARDTOGUESS`

## Login

When generating the token during the `login` process, make sure to use the same secret key that is specified in the `.env` file. This is important because the `checkAuth` function uses this secret key to verify the authenticity of the token during subsequent requests. If a different secret key is used, the token will not be verified successfully and the request will be rejected.

```javascript
exports.login = async (req, res) => {
  const { email, password } = req.body; // Check if email and password are present
  if (!email || !password) {
    return res.status(422).json({ message: 'Email and password are required' });
  }

  // rest of your code

  // If the email and password are correct, create a JWT token
  // Make sure to use same SECRETKEY in this function
  const token = jwt.sign({ user: foundUser }, process.env.SECRETKEY, {
    expiresIn: '12h',
  });

  res.status(201).json({ user: foundUser, token: token });
};
```

## Middleware

Step 2: Pass this `SECRETKEY` in `checkAuth(process.env.SECRETKEY)` middleware

```javascript
// routes.js
const express = require('express');
const router = express.Router();
const checkAuth = require('node-authify');

router.use(checkAuth('secret-key'));

router.delete('/delete/:id', deleteUserById);

// OR you can use like this

router.delete('/delete/:id', checkAuth('secret-key'), deleteUserById);
```

After succesfull verification you can access users information. You can perform authorization task based on this.

## Usage Note

Another point to mention in the library overview would be that upon successful verification of the JWT token, the checkAuth middleware adds the decoded token as a property `user` to the `req` object. This allows the user's information to be accessed in subsequent middleware or route handlers, enabling the implementation of role-based access control or other forms of user authentication.

```javascript
const userId = req.user.userId;
if (todo.user.toString() !== userId) {
  return res.status(401).json({ message: 'Unauthorized' });
}
```

## Feedback

Node-Authify is actively under development to add more features, improve performance, and address any issues reported during testing. Feedback from users testing the library is appreciated.
