import {LucidModel} from "@ioc:Adonis/Lucid/Model";
import Product from "App/Models/Product";
import IListProductsServiceParams from "Contracts/interfaces/IListProductsServiceParams";

export default class ListService {
  private readonly _columns: string[] = [
    'id',
    'image',
    'name',
    'price',
    'description_small',
  ]
  public async run(
    params: IListProductsServiceParams
  ): Promise<InstanceType<LucidModel>[]>
  {
    try {
      const resultQuery = Product
        .query()
        .select(this._columns)

      if (params.search) {
        const resultString: string = params.search.toLowerCase()
        resultQuery.whereRaw(`name LIKE '%${resultString}%'`)
      }

      if (params.category_id) {
        resultQuery.where('category_id', '=', params.category_id)
      }

      if (params.price_min) {
        resultQuery.where('price', '>=', params.price_min)
      }

      if (params.price_max) {
        resultQuery.where('category_id', '<=', params.price_max)
      }

      if (params.sort_desc) {
        resultQuery.orderBy(params.sort_by, 'desc')
      } else {
        resultQuery.orderBy(params.sort_by, 'asc')
      }

      const limit: number = params.limit || 9
      const page: number = params.page || 1

      return await resultQuery.paginate(page, limit)
    } catch (e) {
      throw e
    }
  }
}
