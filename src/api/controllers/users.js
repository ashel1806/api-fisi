import bcrypt from 'bcrypt'
import { User } from '../models/index.js'

export default class UsersController {
  static async apiPostUser(req, res, next) {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser.toJSON())
  }
}