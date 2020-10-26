import User from "App/Models/User";
import EUserRoles from "Contracts/enums/userRoles";
import IGetUsersServiceParams from "Contracts/interfaces/IGetUsersServiceParams";
import {LucidModel} from "@ioc:Adonis/Lucid/Model";

export default class GetUsersService {
  private readonly _columns: string[] = [
    'id',
    'role',
    'avatar',
    'name',
    'phone',
    'email',
    'created_at',
  ]
  public async run(
    params: IGetUsersServiceParams
  ): Promise<InstanceType<LucidModel>[]>
  {
    try {
      const resultQuery = User
        .query()
        .select(this._columns)
        .where('role', '!=', EUserRoles.ROLE_SUPER_ADMIN)

      if (params.type) {
        resultQuery.where('role', '=', params.type)
      }

      if (params.search) {
        const resultString: string = params.search.toLowerCase()
        resultQuery.whereRaw(`name LIKE '%${resultString}%'`)
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
