var express = require('express');
var router = express.Router();
const user = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const validateSignUp = require('../middlewares/validateSignUp')

const JWT_SECRET = process.env.JWT_SECRET

/* POST users listing. */
router.post('/register', validateSignUp, async (req, res) => {
  const body = req.body
  console.log(body)
  const pUser = await user.findOne({
    where: {
      email: body.email
    }
  })
  if (pUser) {
    res.status(401)
      .send({
        message: "email registered"
      })
  } else {
    body.name = body.name || ""
    const passwordHash = bcrypt.hashSync(body.password, 10)
    const userData = {
      name: body.name,
      email: body.email,
      password: passwordHash
    }
    console.log(userData)
    await (await user.create(userData)).save()
    res.send({
      name: body.name,
      email: body.email,
      token: jwt.sign({
        data: JSON.stringify({
          email: body.email
        })
      }, JWT_SECRET, { expiresIn: 60 * 60 })
    })
  }
})

router.post('/login', async (req, res) => {
  const body = req.body
  console.log(body)
  const pUser = await user.findOne({
    where: {
      email: body.email
    }
  })
  if (pUser) {
    console.log(pUser)
    const datas = pUser.dataValues
    if(bcrypt.compareSync(body.password, datas.password)){
      res.status(200)
        .send({
          email: datas.email,
          name: datas.name,
          token: jwt.sign({
            data: JSON.stringify({
              email: datas.email
            })
          }, JWT_SECRET, { expiresIn: 60 * 60 })
        })
    }
    else {
      res.status(406)
        .send({
          message: "invalid password"
        })
    }
  } else {
    res.status(406)
      .send({
        message: "user does not exists"
      })
  }
})

router.get('/verify', async (req, res) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  try {
    const data = jwt.verify(authHeader, JWT_SECRET);
    const json = JSON.parse(data.data)
    const pUser = await user.findOne({
      where: {
        email: json.email
      }
    })
    if (pUser) {
      console.log(pUser)
      const userData = pUser.dataValues
      res.send({
        name: userData.name,
        email: userData.email
      })
    }
    else {
      res.sendStatus(406)
    }
  }catch (err){
    res.sendStatus(406)
  }
})

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
