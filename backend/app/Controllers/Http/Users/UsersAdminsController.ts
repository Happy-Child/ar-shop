import BaseController from "App/Controllers/Http/BaseController";
import {schema} from "@ioc:Adonis/Core/Validator";

import schemeRegistration from "App/Helpers/validationSchemes/users/schemeRegistration";
import schemeUserUpdate from "App/Helpers/validationSchemes/users/schemeUserUpdate";

import {RequestContract} from "@ioc:Adonis/Core/Request";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";

import EUserRoles from "Contracts/enums/userRoles";

import User from "App/Models/User";

import UserCreateService from "App/Services/User/Admin/UserCreateService";
import UserUpdateService from "App/Services/User/Admin/UserUpdateService";
import UserDeleteService from "App/Services/User/Admin/UserDeleteService";

const UserCreateServiceInit = new UserCreateService()
const UserUpdateServiceInit = new UserUpdateService()
const UserDeleteServiceInit = new UserDeleteService()

export default class UsersAdminsController extends BaseController {
  private readonly _rolesForCreated: EUserRoles[] = [
    EUserRoles.ROLE_ADMIN,
    EUserRoles.ROLE_MANAGER,
    EUserRoles.ROLE_USER,
  ]

  public async userCreate (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {
        role,
        verified,
        name,
        phone,
        email,
        password,
        sex,
      } = await request.validate({
        schema: schema.create({
          ...schemeRegistration,
          role: schema.enum.optional(this._rolesForCreated),
          verified: schema.boolean.optional(),
        })
      })

      await UserCreateServiceInit.run(
        {
          name,
          phone,
          email,
          password,
          sex,
          role,
          verified,
        } as User,
        auth
      )

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async userUpdate (
    {request, params, auth}: {request: RequestContract, params: any, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {
        role,
        verified,
        name,
        phone,
        email,
        password,
        sex,
      } = await request.validate({
        schema: schema.create({
          ...schemeUserUpdate,
          role: schema.enum.optional(this._rolesForCreated),
          verified: schema.boolean.optional(),
        })
      })

      await UserUpdateServiceInit.run(
        auth,
        {
          name,
          phone,
          email,
          password,
          sex,
          role,
          verified,
        } as User,
        Number(params.id)
      )

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async userDelete (
    {params, auth}: {params: any, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await UserDeleteServiceInit.run(
        auth,
        Number(params.id)
      )

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }
}
