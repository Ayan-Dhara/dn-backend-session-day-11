const validateSignUp = (req, res, next) => {
  const {name, email, password, confirm} = req.body
  if(
    name &&
    email &&
    password &&
    confirm &&
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ // email regex
      .test(email) &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // password regex
      .test(password) &&
    password === confirm
  ) next()
  else
    res.status(401)
      .send({
        message: "invalid signup up data"
      })
}
module.exports = validateSignUp
