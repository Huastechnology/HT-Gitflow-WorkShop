/**
 * @todo
 * write your user controller here
 */
const UserSchema = require('../models/user.model')
const { generateHash } = require('../utils/GenerateHash')
const { matchPass } = require('../utils/MatchPass')
const { generateToken } = require('../utils/token')

async function saveUser(req, res) {
  let user = new UserSchema()
  user.completeName = req.body.completeName
  user.userName = req.body.userName
  user.email = req.body.email
  user.password = generateHash(req.body.password, 10)

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

async function SignIn(req, res) {
  const userData = {
    userName: req.body.userName,
    password: req.body.password
  }
  let matchUser
  try {
    matchUser = await UserSchema.findOne({
      userName: userData.userName
    })
  } catch (error) {
    console.log(error);
  }
  if(!matchUser){
    res.status(204).send({msg:'User not found'})
    return;
  }
  const matchpass = await matchPass(userData.password, matchUser.password)
  if(!matchpass){
    res.status(203).send({msg:'Invalid pass.'})
    return;
  }
  userData.password = matchUser.password
  const token = generateToken(userData)
  res.status(200).send({msg:'Access Success', token:token})
}

module.exports = {
  saveUser,
  SignIn
}