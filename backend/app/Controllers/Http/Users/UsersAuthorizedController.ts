import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema} from "@ioc:Adonis/Core/Validator";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";

import BaseController from "App/Controllers/Http/BaseController";

import schemeUserUpdate from "App/Helpers/validationSchemes/users/schemeUserUpdate";

import UpdateService from "App/Services/User/Authorized/UpdateService";

import User from "App/Models/User";

const UpdateServiceInit = new UpdateService()

export default class UsersAuthorizedController extends BaseController {
  public async authByToken (
    {auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      return this.successResponse(200, auth.user)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async logout (
    {auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      await auth.logout()

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async update (
    {request, auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {
        name,
        phone,
        email,
        password,
        sex,
      } = await request.validate({
        schema: schema.create(schemeUserUpdate)
      })

      await UpdateServiceInit.run(
        {
          name,
          phone,
          email,
          password,
          sex,
        } as User,
        auth
      )

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }
}
