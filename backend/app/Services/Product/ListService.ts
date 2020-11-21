import Product from "App/Models/Product";
import IListProductsServiceParams from "Contracts/interfaces/IListProductsServiceParams";
import {LucidModel} from "@ioc:Adonis/Lucid/Model";

export default class ListService {
  private readonly _columns: string[] = [
    'id',
    'category_id',
    'user_id',
    'image',
    'name',
    'price',
    'description_full',
    'description_small',
    'created_at',
  ]
  public async run(
    params: IListProductsServiceParams
  ): Promise<{ products: InstanceType<LucidModel>[], prices: {min: number, max: number} }>
  {
    try {
      const resultQuery = Product
        .query()
        .select(this._columns)
        .preload('category', query => {
          query.select([
            'id',
            'name',
          ])
        })
        .preload('user', query => {
          query.select([
            'id',
            'role',
            'avatar',
            'name',
            'phone',
            'email',
            'created_at',
          ])
        })

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
        resultQuery.where('price', '<=', params.price_max)
      }

      if (params.sort_desc) {
        resultQuery.orderBy(params.sort_by, 'desc')
      } else {
        resultQuery.orderBy(params.sort_by, 'asc')
      }

      const limit: number = params.limit || 9
      const page: number = params.page || 1

      const [minPrice]: {min: number}[] = await Product.query().min('price as min');
      const [maxPrice]: {max: number}[] = await Product.query().max('price as max');

      const products: InstanceType<LucidModel>[] = await resultQuery.paginate(page, limit)

      return {
        products,
        prices: {
          min: minPrice.min,
          max: maxPrice.max,
        }
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
