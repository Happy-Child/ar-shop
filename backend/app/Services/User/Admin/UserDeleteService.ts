import User from "App/Models/User";
import AdminService from "App/Services/User/Admin/AdminService";
import {E_USER_NOT_FOUND} from "App/Helpers/errorTypes";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

export default class UserDeleteService extends AdminService {
  public async run(
    auth: AuthContract,
    id: number
  ): Promise<void> {
    try {
      const authUser: User | undefined = auth.use('api').user
      const idAuthUser: number = authUser?.id || 0
      const roleAuthUser: number = authUser?.role || 0

      if (idAuthUser === id) {
        throw {
          code: E_USER_NOT_FOUND
        }
      }

      const user: User = await User.findOrFail(id)
      const checkedRole: number = Number(user?.role) || 0

      this.checkPermissions(roleAuthUser, checkedRole)

      await user.delete()
    } catch (e) {
      throw e
    }
  }
}
