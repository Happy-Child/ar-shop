import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from "@ioc:Adonis/Core/Validator";

import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";

import validationSchemeLogin from "../../../lib/validationSchemes/validationSchemeLogin";
import validationSchemeRegistration from "../../../lib/validationSchemes/validationSchemeRegistration";
import validationSchemeUserUpdate from "../../../lib/validationSchemes/validationSchemeUserUpdate";

import ReConfirmationEmailService from "App/Services/User/ReConfirmationEmailService";
import VerifyEmailService from "App/Services/User/VerifyEmailService";
import LoginService from "App/Services/User/LoginService";
import RegistrationService from "App/Services/User/RegistrationService";
import ResetPasswordService from "App/Services/User/ResetPasswordService";
import CreatePasswordService from "App/Services/User/CreatePasswordService";
import UpdateService from "App/Services/User/UpdateService";

import User from "App/Models/User";
import {E_INVALID_TOKEN} from "../../../lib/errorTypes";
import {regVPassword} from "../../../lib/regV";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import {RequestContract} from "@ioc:Adonis/Core/Request";

const ReConfirmationEmailServiceInit = new ReConfirmationEmailService()
const VerifyEmailServiceInit = new VerifyEmailService()
const LoginServiceInit = new LoginService()
const RegistrationServiceInit = new RegistrationService()
const ResetPasswordServiceInit = new ResetPasswordService()
const CreatePasswordServiceInit = new CreatePasswordService()
const UpdateServiceInit = new UpdateService()

export default class UserController {
  public async reConfirmationEmail (
    {params, auth}: {params: any, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await ReConfirmationEmailServiceInit.run(params.email, auth)

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors,
        }
      } as IErrorResponse
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

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
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

      return {
        status: 200,
        data,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
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

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
    }
  }

  public async resetPassword (
    {params, auth}: {params: any, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await ResetPasswordServiceInit.run(params.email, auth)

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
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

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
    }
  }

  public async authByToken (
    {auth}: {auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      return {
        status: 200,
        user: auth.user,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
    }
  }

  public async logout (
    {auth}: {auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      let userId

      if (auth.user instanceof User) {
        userId = auth?.user?.id || ''
      }

      const user: User = await User.findOrFail(userId)
      user.lastVisited = new Date()
      user
        .save()
        .catch(e => {
          throw e
        })

      await auth.logout()

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
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

      return {
        status: 200,
      } as ISuccessResponse
    } catch (e) {
      return {
        error: {
          code: e.code || 'E_UNDEFINED',
          data: e?.messages?.errors
        }
      } as IErrorResponse
    }
  }
}
