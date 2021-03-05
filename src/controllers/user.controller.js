/**
 * @todo
 * write your user controller here
 */
const UserSchema = require('../models/user.model')

async function saveUser(req, res) {
  let user = new UserSchema()
  user.completeName = req.body.completeName
  user.userName = req.body.userName
  user.email = req.body.email
  user.password = req.body.password

  try {
    await user.save((error, userStored) => {
      if(error) {
        res.status(500).send({
          msg: error
        })
      } else {
        res.status(201).send({
          userStored,
          "message":"user registered successfully",
          "code": 201
        })
      }
    })
  } catch(error) {
    throw error
  }
}

module.exports = {
  saveUser
}