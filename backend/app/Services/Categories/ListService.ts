import {LucidModel} from "@ioc:Adonis/Lucid/Model";
import Category from "App/Models/Category";
import IListCategoriesServiceParams from "Contracts/interfaces/IListCategoriesServiceParams";
import {SimplePaginatorContract, SimplePaginatorMeta} from "@ioc:Adonis/Lucid/DatabaseQueryBuilder";

export default class ListService {
  private readonly _columns: string[] = [
    'id',
    'image_small',
    'name',
    'created_at',
  ]
  public async run(
    params: IListCategoriesServiceParams
  ): Promise<{ meta: SimplePaginatorMeta; data: InstanceType<LucidModel>[] }> {
    try {
      const resultQuery = Category
        .query()
        .select(this._columns)
        .withCount('products')

      if (params.search) {
        const resultString: string = params.search.toLowerCase()
        resultQuery.whereRaw(`name LIKE '%${resultString}%'`)
      }

      resultQuery.withCount('products', query => {
        query.as('productsCount')
      })

      if (params.sort_desc) {
        resultQuery.orderBy(params.sort_by, 'desc')
      } else {
        resultQuery.orderBy(params.sort_by, 'asc')
      }

      const limit: number = params.limit || 9
      const page: number = params.page || 1

      const categories: SimplePaginatorContract<InstanceType<LucidModel>> = await resultQuery.paginate(page, limit)

      const resultCategories = categories.toJSON()

      resultCategories.data = resultCategories.data.map((category: Category) => {
        return {
          ...category.$attributes,
          products_count: category.$extras?.productsCount
        } as Category
      })

      return resultCategories
    } catch (e) {
      throw e
    }
  }
}
