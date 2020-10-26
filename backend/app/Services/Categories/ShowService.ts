import {LucidRow} from "@ioc:Adonis/Lucid/Model";
import {E_CATEGORY_NOT_FOUND} from "App/Helpers/errorTypes";
import Category from "App/Models/Category";

export default class ShowService {
  private readonly _columns: string[] = [
    'id',
    'user_id',
    'image',
    'name',
    'created_at',
  ]
  public async run(id: number): Promise<LucidRow>
  {
    try {
      const resultQuery = Category
        .query()
        .select(this._columns)
        .withCount('products')
        .where('id', '=', id)

      resultQuery.withCount('products', query => {
        query.as('productsCount')
      })

      const [category]: LucidRow[] =  await resultQuery

      if (!category) {
        throw {
          code: E_CATEGORY_NOT_FOUND
        }
      }

      return category
    } catch (e) {
      throw e
    }
  }
}
