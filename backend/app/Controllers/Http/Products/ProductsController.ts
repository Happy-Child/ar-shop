import BaseController from "App/Controllers/Http/BaseController";
import {RequestContract} from "@ioc:Adonis/Core/Request";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";

export default class ProductsController extends BaseController {
  public async getProducts (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {

  }

  public async getProduct (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {

  }

  public async createProduct (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {

  }

  public async updateProduct (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {

  }

  public async deleteProduct (
    {request, auth}: {request: RequestContract, auth: AuthContract}
  ): Promise<ISuccessResponse | IErrorResponse>
  {

  }
}
