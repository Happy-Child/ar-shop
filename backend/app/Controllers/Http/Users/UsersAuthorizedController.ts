import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {schema} from "@ioc:Adonis/Core/Validator";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";

import BaseController from "App/Controllers/Http/BaseController";

import validationSchemeUserUpdate from "../../../../lib/validationSchemes/validationSchemeUserUpdate";

import UpdateService from "App/Services/User/Authorized/UpdateService";

import User from "App/Models/User";

import {AuthContract} from "@ioc:Adonis/Addons/Auth";


const UpdateServiceInit = new UpdateService()

export default class UsersAuthorizedController extends BaseController {
  public async authByToken (
    {auth}: {auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      return this.successResponse(200, auth.user)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async logout (
    {auth}: {auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await auth.logout()

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async update (
    {request, auth}: HttpContextContract
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {
        name,
        phone,
        email,
        password,
        sex,
      } = await request.validate({
        schema: schema.create(validationSchemeUserUpdate)
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
      return this.errorResponse(e)
    }
  }
}
