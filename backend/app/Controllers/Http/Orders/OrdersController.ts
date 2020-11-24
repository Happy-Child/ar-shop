import BaseController from "App/Controllers/Http/BaseController";
import {LucidModel} from "@ioc:Adonis/Lucid/Model";
import {SimplePaginatorContract} from "@ioc:Adonis/Lucid/DatabaseQueryBuilder";

import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IOrderProducts from "Contracts/interfaces/IOrderProducts";

import {schema} from "@ioc:Adonis/Core/Validator";

import schemeCreate from "App/Helpers/validationSchemes/orders/schemeCreate";
import schemeUpdate from "App/Helpers/validationSchemes/orders/schemeUpdate";
import schemeList from "App/Helpers/validationSchemes/orders/schemeList";

import IListOrdersServiceParams from "Contracts/interfaces/IListOrdersServiceParams";

import GetMyService from "App/Services/Orders/GetMyService";
import CreateService from "App/Services/Orders/CreateService";
import ListService from "App/Services/Orders/ListService";
import ShowService from "App/Services/Orders/ShowService";
import UpdateService from "App/Services/Orders/UpdateService";
import DeleteService from "App/Services/Orders/DeleteService";

import Order from "App/Models/Order";
import User from "App/Models/User";
import EOrderStatuses from "Contracts/enums/orderStatuses";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

const GetMyServiceInit = new GetMyService()
const CreateServiceInit = new CreateService()
const ListServiceInit = new ListService()
const ShowServiceInit = new ShowService()
const UpdateServiceInit = new UpdateService()
const DeleteServiceInit = new DeleteService()

export default class OrdersController extends BaseController {
  public async getMyOrders ({auth, response}: HttpContextContract): Promise<ISuccessResponse | void>
  {
    try {
      const data: InstanceType<LucidModel>[] = await GetMyServiceInit.run(auth)
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
        from_date,
        to_date,
        sort_by = 'created_at',
        sort_desc = true,
        page,
        limit,
      } = await request.validate({
        schema: schema.create(schemeList)
      })

      const data: SimplePaginatorContract<InstanceType<LucidModel>> = await ListServiceInit.run(
        {
          from_date,
          to_date,
          sort_by,
          sort_desc,
          page,
          limit,
        } as IListOrdersServiceParams,
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
      const data: Order = await ShowServiceInit.run(Number(params.id))

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
        products,
        delivery_address,
        comment,
      } = await request.validate({
        schema: schema.create(schemeCreate)
      })

      const user: User | undefined = auth.use('api').user
      const user_id: number = Number(user?.id)
      const name: string = String(user?.name)
      const phone: string = String(user?.phone)
      const email: string = String(user?.email)
      const status: EOrderStatuses = EOrderStatuses.STATUS_NEW

      await CreateServiceInit.run(
        {
          user_id,
          name,
          phone,
          email,
          comment,
          status,
          delivery_address,
        } as Order,
        products as Array<IOrderProducts>
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
        products,
        delivery_address,
        comment,
        status,
      } = await request.validate({
        schema: schema.create(schemeUpdate)
      })

      await UpdateServiceInit.run(
        {
          products,
          delivery_address,
          comment,
          status,
        } as {
          products: Array<IOrderProducts> | undefined,
          delivery_address: string | undefined,
          comment: string | undefined,
          status: EOrderStatuses | undefined,
        },
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
    {params, response}: HttpContextContract
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
