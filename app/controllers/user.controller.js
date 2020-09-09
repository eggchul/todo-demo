const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create and Save a new Tutorial
exports.register = (req, res) => {
  // Check if the user already exists in database
  const emailExistsInDatabase = await User.findOne({
    email: req.body.email.toLowerCase()
  });
  if (emailExistsInDatabase)
    return res.status(400).send('Email already exists');

  // Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = {
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashedPassword
  };

  try {
    // Save user to database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
            });
        });

    // Create and assign a jsonwebtoken to the user
    const token = jwt.sign({ _id: user._id }, 'hello', {
      expiresIn: '365 days'
    });
    res.setHeader('token', token);
    
    res.json({
      success: true,
      errorCode: null,
      errorMessage: null,
      data: {
        user: user._id,
        message: 'User created'
      },
      token: token
    });
  } catch (err) {
    res.json({
      success: false,
      errorCode: 400,
      errorMessage: err.message,
      data: {
        err: err
      }
    });
  }
};

// Find a single user with email and password
exports.login = (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(400).send('Invalid Credentials');
  
    // Check if the submitted password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Credentials');
  
    // Create and assign a jsonwebtoken to the user
    const token = jwt.sign({ _id: user._id }, 'hello', {
      expiresIn: '365 days'
    });
  
    res.setHeader('token', token);
    console.log({ 'token': token });
    res.send({ token: token });
};