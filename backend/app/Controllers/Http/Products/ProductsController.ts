import BaseController from "App/Controllers/Http/BaseController";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import {LucidModel, LucidRow} from "@ioc:Adonis/Lucid/Model";

import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";

import {schema} from "@ioc:Adonis/Core/Validator";

import schemeCreate from "App/Helpers/validationSchemes/products/schemeCreate";
import schemeUpdate from "App/Helpers/validationSchemes/products/schemeUpdate";
import schemeList from "App/Helpers/validationSchemes/products/schemeList";

import IListProductsServiceParams from "Contracts/interfaces/IListProductsServiceParams";

import User from "App/Models/User";
import Product from "App/Models/Product";

import CreateService from "App/Services/Product/CreateService";
import ListService from "App/Services/Product/ListService";
import ShowService from "App/Services/Product/ShowService";
import UpdateService from "App/Services/Product/UpdateService";
import DeleteService from "App/Services/Product/DeleteService";

const CreateServiceInit = new CreateService()
const ListServiceInit = new ListService()
const ShowServiceInit = new ShowService()
const UpdateServiceInit = new UpdateService()
const DeleteServiceInit = new DeleteService()

export default class ProductsController extends BaseController {
  public async list (
    {request}: {request: RequestContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {
        category_id,
        price_min,
        price_max,
        search,
        sort_by = 'name',
        sort_desc = true,
        page,
        limit,
      } = await request.validate({
        schema: schema.create(schemeList)
      })

      const data: { products: InstanceType<LucidModel>[], prices: {min: number, max: number} } = await ListServiceInit.run(
        {
          category_id,
          price_min,
          price_max,
          search,
          sort_by,
          sort_desc,
          page,
          limit,
        } as IListProductsServiceParams,
      )

      return this.successResponse(200, data)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async show (
    {params}: {params: any}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const data: LucidRow = await ShowServiceInit.run(params.id)

      return this.successResponse(200, data)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async create (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {
        category_id,
        price,
        image,
        name,
        description_full,
        description_small,
      } = await request.validate({
        schema: schema.create(schemeCreate)
      })

      const user: User | undefined = auth.use('api').user
      const user_id: number = Number(user?.id)

      await CreateServiceInit.run(
        {
          user_id,
          category_id,
          price,
          image,
          name,
          description_full,
          description_small,
        } as Product,
      )

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async update (
    {request, params}: {request: RequestContract, params: any}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      const {
        category_id,
        price,
        image,
        name,
        description_full,
        description_small,
      } = await request.validate({
        schema: schema.create(schemeUpdate)
      })

      await UpdateServiceInit.run(
        {
          category_id,
          price,
          image,
          name,
          description_full,
          description_small,
        } as Product,
        Number(params.id)
      )

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }

  public async delete (
    {params}: {params: any}
  ): Promise<ISuccessResponse | IErrorResponse>
  {
    try {
      await DeleteServiceInit.run(Number(params.id))

      return this.successResponse(200)
    } catch (e) {
      return this.errorResponse(e)
    }
  }
}
