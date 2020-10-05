import User from "App/Models/User";
import {LucidRow} from "@ioc:Adonis/Lucid/Model";
import EUserRoles from "Contracts/enums/userRoles";
import {E_USER_NOT_FOUND} from "App/Helpers/errorTypes";

export default class GetUserService {
  private readonly _columns: string[] = [
    'id',
    'role',
    'avatar',
    'name',
    'phone',
    'email',
    'createdAt',
    'verified',
  ]
  public async run(id: number): Promise<LucidRow>
  {
    try {
      const resultQuery = User
        .query()
        .select(this._columns)
        .where('role', '!=', EUserRoles.ROLE_SUPER_ADMIN)
        .where('id', '=', id)

      const [user]: LucidRow[] =  await resultQuery

      if (!user) {
        throw {
          code: E_USER_NOT_FOUND
        }
      }

      return user
    } catch (e) {
      throw e
    }
  }
}
