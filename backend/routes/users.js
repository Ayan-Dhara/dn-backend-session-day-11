var express = require('express');
var router = express.Router();
const user = require("../models/user")
const {hash} = require("bcrypt");
const jwt = require('jsonwebtoken')

const findPrevious = async (email) => {
  await product.findAll({
    where: {email},
    attributes: ["id", "title", "price", "description", "image"],
    limit: count
  })
}

/* POST users listing. */
router.post('/register', async (req, res) => {
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
    await (await user.create({
      name: body.fullName,
      email: body.email,
      password: body.password
    })).save()
    res.send({
      token: jwt.sign({
        data: JSON.stringify({
          email: body.email
        })
      }, 'my-secret', { expiresIn: 60 * 60 })
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
    if(body.password === datas.password){
      res.status(200)
        .send({
          token: jwt.sign({
            data: JSON.stringify({
              email: body.email
            })
          }, 'my-secret', { expiresIn: 60 * 60 })
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
    const data = jwt.verify(authHeader, 'my-secret');
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
