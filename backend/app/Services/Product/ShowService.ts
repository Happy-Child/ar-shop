import {LucidRow} from "@ioc:Adonis/Lucid/Model";
import {E_PRODUCT_NOT_FOUND} from "App/Helpers/errorTypes";
import Product from "App/Models/Product";

export default class ShowService {
  private readonly _columns: string[] = [
    'id',
    'category_id',
    'user_id',
    'image',
    'name',
    'price',
    'description_full',
    'description_small',
    'createdAt',
  ]
  public async run(id: number): Promise<LucidRow>
  {
    try {
      const resultQuery = Product
        .query()
        .select(this._columns)
        .where('id', '=', id)

      const [product]: LucidRow[] =  await resultQuery

      if (!product) {
        throw {
          code: E_PRODUCT_NOT_FOUND
        }
      }

      return product
    } catch (e) {
      throw e
    }
  }
}
