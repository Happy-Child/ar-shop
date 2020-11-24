import {schema} from "@ioc:Adonis/Core/Validator";

import BaseController from "App/Controllers/Http/BaseController";

import GetUsersService from "App/Services/User/Member/GetUsersService";
import GetUserService from "App/Services/User/Member/GetUserService";

import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IGetUsersServiceParams from "Contracts/interfaces/IGetUsersServiceParams";

import schemeGetUsers from "App/Helpers/validationSchemes/users/schemeGetUsers";

import {LucidModel, LucidRow} from "@ioc:Adonis/Lucid/Model";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

const GetUsersServiceInit = new GetUsersService()
const GetUserServiceInit = new GetUserService()

export default class UsersMembersController extends BaseController {
  public async getUsers(
    {request, response}: HttpContextContract
  ): Promise<ISuccessResponse | void> {
    try {
      const {
        type,
        search,
        sort_by = 'name',
        sort_desc = true,
        page,
        limit,
      } = await request.validate({
        schema: schema.create(schemeGetUsers)
      })

      const data: InstanceType<LucidModel>[] = await GetUsersServiceInit.run({
        type,
        search,
        sort_by,
        sort_desc,
        page,
        limit,
      } as IGetUsersServiceParams)

      return this.successResponse(200, data)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async getUser(
    {params, response}: HttpContextContract
  ): Promise<ISuccessResponse | void> {
    try {
      const data: LucidRow = await GetUserServiceInit.run(params.id)

      return this.successResponse(200, data)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }
}
