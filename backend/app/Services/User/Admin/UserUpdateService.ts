import User from "App/Models/User";
import AdminService from "App/Services/User/Admin/AdminService";
import {E_USER_NOT_FOUND} from "App/Helpers/errorTypes";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

export default class UserUpdateService extends AdminService {
  public async run(
    auth: AuthContract,
    {name, phone, email, password, sex, role, verified}: User,
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

      if (role) user.role = role
      if (verified) user.verified = verified
      if (name) user.name = name
      if (phone) user.phone = phone
      if (email) user.email = email
      if (password) user.password = password
      if (sex) user.sex = sex

      await user.save()
    } catch (e) {
      throw e
    }
  }
}
