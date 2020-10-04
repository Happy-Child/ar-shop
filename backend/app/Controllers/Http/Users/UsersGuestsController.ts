import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

import BaseController from "App/Controllers/Http/BaseController";

import {E_INVALID_TOKEN} from "../../../../lib/errorTypes";
import {regVPassword} from "../../../../lib/regV";
import validationSchemeLogin from "../../../../lib/validationSchemes/validationSchemeLogin";
import validationSchemeRegistration from "../../../../lib/validationSchemes/validationSchemeRegistration";

import User from "App/Models/User";

import ReConfirmationEmailService from "App/Services/User/Guest/ReConfirmationEmailService";
import VerifyEmailService from "App/Services/User/Guest/VerifyEmailService";
import LoginService from "App/Services/User/Guest/LoginService";
import RegistrationService from "App/Services/User/Guest/RegistrationService";
import ResetPasswordService from "App/Services/User/Guest/ResetPasswordService";
import CreatePasswordService from "App/Services/User/Guest/CreatePasswordService";

const ReConfirmationEmailServiceInit = new ReConfirmationEmailService()
const VerifyEmailServiceInit = new VerifyEmailService()
const LoginServiceInit = new LoginService()
const RegistrationServiceInit = new RegistrationService()
const ResetPasswordServiceInit = new ResetPasswordService()
const CreatePasswordServiceInit = new CreatePasswordService()

export default class UsersGuestsController extends BaseController {
  public async reConfirmationEmail (
    {params, auth}: {params: any, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await ReConfirmationEmailServiceInit.run(params.email, auth)

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async verifyEmail (
    {request}: {request: RequestContract}
  ): Promise<ISuccessResponse | IErrorResponse>
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
      return this.errorResponse(e)
    }
  }

  public async login (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {email, password} = await request.validate({
        schema: schema.create(validationSchemeLogin)
      })

      const data: object = await LoginServiceInit.run({
        auth,
        email,
        password
      })

      return this.successResponse(200, data)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async registration (
    {request, auth}: {request: RequestContract, auth: AuthContract}
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
        schema: schema.create(validationSchemeRegistration)
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
      return this.errorResponse(e)
    }
  }

  public async resetPassword (
    {params, auth}: {params: any, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await ResetPasswordServiceInit.run(params.email, auth)

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async createNewPassword (
    {request}: {request: RequestContract}
  ): Promise<ISuccessResponse | IErrorResponse>
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
      return this.errorResponse(e)
    }
  }
}
