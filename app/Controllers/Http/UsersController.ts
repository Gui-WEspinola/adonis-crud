import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()
    return users
  }

  public async store({ request }: HttpContextContract) {
    const body = request.only(['name', 'email', 'password'])
    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password
    })

    console.log(user.$isPersisted)
    return user
  }

  public async show({}: HttpContextContract) {}
  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
