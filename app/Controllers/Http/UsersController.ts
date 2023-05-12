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
      password: body.password,
    })

    console.log(user.$isPersisted)
    return user
  }

  public async show({  }: HttpContextContract) {}
  public async update({ request }: HttpContextContract) {
    const userId = request.param('id')
    const body = request.only(['name', 'email'])
    const user = await User.findOrFail(userId)
    return await user.merge(body).save()
  }

  public async destroy({ request, response }: HttpContextContract) {
    const userId = request.param('id');
    try {
      const user = await User.findOrFail(userId)
      response.status(204)
      await user.delete();
      console.log(user.$isDeleted)
    } catch (error) {
      if (error.code === "E_ROW_NOT_FOUND"){
        response.status(404).json({
          message: `User with ID ${userId} doesn't exist.`
        });
      } else {
        response.status(500).json({
          message: `An error occurred while deleting the user.`
        })
      }
    }
  }
}
