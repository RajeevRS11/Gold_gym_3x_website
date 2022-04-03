const User = require('../modules/userModule');
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer'); // for email
const { name } = require('pug/lib');

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
//for sending mail
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: 'rs.pharma11@gmail.com',
      to: email,
      subject: 'For verification mail',
      // html: `<p>Hii ${name} please click here to <a href ="http://localhost:${process.env.PORT}/verify?id=${user_id}"> Verify </a> your mail.</p>`,
        html: `<p>Hii ${name} please click here to <a href ="https://gold-fitness-point-testing.herokuapp.com:${process.env.PORT}/verify?id=${user_id}"> Verify </a> your mail.</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email has been sent:-', info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
// ----------------------
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );
    console.log(updateInfo);
    res.render('emailVerified.pug');
  } catch (error) {
    console.log(error.message);
  }
};

// user login

const loginLoad = async (req, res) => {
  try {
    res.render('login.pug');
  } catch (error) {
    console.log(error.message);
  }
};
const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.is_verified === 0) {
          res.render('login', { message: `Please verify your email.` });
        } else {
          req.session.user_id = userData._id;
          res.redirect('/home');
        }
      } else {
        res.render('login.pug', {
          message: `Email and password are incorrect`,
        });
      }
    } else {
      res.render('login.pug', { message: `Email and password are incorrect` });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// load home
const loadHome = async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.session.user_id });
    res.render('home.pug', { user: userData });
  } catch (error) {
    console.log(error.message);
  }
};

// user logout
const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  insertUser,
  verifyMail,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
};
