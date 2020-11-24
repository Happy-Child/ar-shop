import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

import BaseController from "App/Controllers/Http/BaseController";

import {E_INVALID_TOKEN} from "App/Helpers/errorTypes";
import {regVPassword} from "App/Helpers/regV";

import schemeLogin from "App/Helpers/validationSchemes/users/schemeLogin";
import schemeRegistration from "App/Helpers/validationSchemes/users/schemeRegistration";

import User from "App/Models/User";

import ReConfirmationEmailService from "App/Services/User/Guest/ReConfirmationEmailService";
import VerifyEmailService from "App/Services/User/Guest/VerifyEmailService";
import LoginService from "App/Services/User/Guest/LoginService";
import RegistrationService from "App/Services/User/Guest/RegistrationService";
import ResetPasswordService from "App/Services/User/Guest/ResetPasswordService";
import CreatePasswordService from "App/Services/User/Guest/CreatePasswordService";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

const ReConfirmationEmailServiceInit = new ReConfirmationEmailService()
const VerifyEmailServiceInit = new VerifyEmailService()
const LoginServiceInit = new LoginService()
const RegistrationServiceInit = new RegistrationService()
const ResetPasswordServiceInit = new ResetPasswordService()
const CreatePasswordServiceInit = new CreatePasswordService()



export default class UsersGuestsController extends BaseController {
  public async reConfirmationEmail (
    {params, auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      await ReConfirmationEmailServiceInit.run(params.email, auth)

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async verifyEmail (
    {request, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {token} = request.get()

      if (!token) {
        throw {
          code: E_INVALID_TOKEN
        }
      }

      await VerifyEmailServiceInit.run(token)

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async login (
    {request, auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {email, password} = await request.validate({
        schema: schema.create(schemeLogin)
      })

      const data: object = await LoginServiceInit.run({
        auth,
        email,
        password
      })

      return this.successResponse(200, data)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async registration (
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
        schema: schema.create(schemeRegistration)
      })

      await RegistrationServiceInit.run(
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

  public async resetPassword (
    {params, auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      await ResetPasswordServiceInit.run(params.email, auth)

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async createNewPassword (
    {request, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {token} = request.get()

      if (!token) {
        throw {
          code: E_INVALID_TOKEN
        }
      }

      const {password} = await request.validate({
        schema: schema.create({
          password: schema.string(
            {trim: true},
            [
              rules.confirmed(),
              rules.regex(regVPassword)
            ]
          ),
        })
      })

      await CreatePasswordServiceInit.run(token, password)

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }
}
