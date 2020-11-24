import BaseController from "App/Controllers/Http/BaseController";
import {LucidModel, LucidRow} from "@ioc:Adonis/Lucid/Model";
import {SimplePaginatorMeta} from "@ioc:Adonis/Lucid/DatabaseQueryBuilder";

import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";

import {schema} from "@ioc:Adonis/Core/Validator";

import schemeCreate from "App/Helpers/validationSchemes/categories/schemeCreate";
import schemeUpdate from "App/Helpers/validationSchemes/categories/schemeUpdate";
import schemeList from "App/Helpers/validationSchemes/categories/schemeList";

import IListCategoriesServiceParams from "Contracts/interfaces/IListCategoriesServiceParams";

import GetAllService from "App/Services/Categories/GetAllService";
import CreateService from "App/Services/Categories/CreateService";
import ListService from "App/Services/Categories/ListService";
import ShowService from "App/Services/Categories/ShowService";
import UpdateService from "App/Services/Categories/UpdateService";
import DeleteService from "App/Services/Categories/DeleteService";

import Category from "App/Models/Category";
import User from "App/Models/User";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

const GetAllServiceInit = new GetAllService()
const CreateServiceInit = new CreateService()
const ListServiceInit = new ListService()
const ShowServiceInit = new ShowService()
const UpdateServiceInit = new UpdateService()
const DeleteServiceInit = new DeleteService()

export default class CategoriesController extends BaseController {
  public async getAll ({response}: HttpContextContract): Promise<ISuccessResponse | void>
  {
    try {
      const data: InstanceType<LucidModel>[] = await GetAllServiceInit.run()
      return this.successResponse(200, data)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async list (
    {request, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {
        search,
        sort_by = 'name',
        sort_desc = true,
        page,
        limit,
      } = await request.validate({
        schema: schema.create(schemeList)
      })

      const data: { meta: SimplePaginatorMeta; data: InstanceType<LucidModel>[] } = await ListServiceInit.run(
        {
          search,
          sort_by,
          sort_desc,
          page,
          limit,
        } as IListCategoriesServiceParams,
      )

      return this.successResponse(200, data)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async show (
    {params, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const data: LucidRow = await ShowServiceInit.run(params.id)

      return this.successResponse(200, data)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async create (
    {request, auth, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {
        image,
        name,
      } = await request.validate({
        schema: schema.create(schemeCreate)
      })

      const user: User | undefined = auth.use('api').user
      const user_id: number = Number(user?.id)

      await CreateServiceInit.run(
        {
          user_id,
          image,
          name,
        } as Category,
      )

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async update (
    {request, params, response}: HttpContextContract
  ): Promise<ISuccessResponse | void>
  {
    try {
      const {
        image,
        name,
      } = await request.validate({
        schema: schema.create(schemeUpdate)
      })

      await UpdateServiceInit.run(
        {
          image,
          name,
        } as Category,
        Number(params.id)
      )

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }

  public async delete (
    {params, response}: {params: any, response: any}
  ): Promise<ISuccessResponse | void>
  {
    try {
      await DeleteServiceInit.run(Number(params.id))

      return this.successResponse(200)
    } catch (e) {
      response
        .status(e.status)
        .json(this.errorResponse(e))
    }
  }
}
