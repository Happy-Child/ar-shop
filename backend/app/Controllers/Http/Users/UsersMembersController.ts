import {schema} from "@ioc:Adonis/Core/Validator";

import BaseController from "App/Controllers/Http/BaseController";

import GetUsersService from "App/Services/User/Member/GetUsersService";
import GetUserService from "App/Services/User/Member/GetUserService";

import {RequestContract} from "@ioc:Adonis/Core/Request";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";
import IGetUsersServiceParams from "Contracts/interfaces/IGetUsersServiceParams";

import schemeGetUsers from "App/Helpers/validationSchemes/users/schemeGetUsers";

import {LucidModel, LucidRow} from "@ioc:Adonis/Lucid/Model";

const GetUsersServiceInit = new GetUsersService()
const GetUserServiceInit = new GetUserService()

export default class UsersMembersController extends BaseController {
  public async getUsers (
    {request}: {request: RequestContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
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
      return this.errorResponse(e)
    }
  }

  public async getUser (
    {params}: {params: any}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const data: LucidRow = await GetUserServiceInit.run(params.id)

      return this.successResponse(200, data)
    } catch (e) {
      return this.errorResponse(e)
    }
  }
}
