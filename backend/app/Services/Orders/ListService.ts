import {LucidModel} from "@ioc:Adonis/Lucid/Model";
import Order from "App/Models/Order";
import {SimplePaginatorContract} from "@ioc:Adonis/Lucid/DatabaseQueryBuilder";
import IListOrdersServiceParams from "Contracts/interfaces/IListOrdersServiceParams";

export default class ListService {
  private readonly _columns: string[] = [
    'id',
    'name',
    'email',
    'status',
    'createdAt',
  ]
  public async run(
    params: IListOrdersServiceParams
  ): Promise<SimplePaginatorContract<InstanceType<LucidModel>>> {
    try {
      const resultQuery = Order
        .query()
        .select(this._columns)

      if (params.from_date) {
        resultQuery.where('created_at', '>=', params.from_date)
      }

      if (params.to_date) {
        resultQuery.where('created_at', '<=', params.to_date)
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
