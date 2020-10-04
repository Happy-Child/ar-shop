import User from "App/Models/User";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

export default class UpdateService {
  public async run({name, phone, email, password, sex}: User, auth: AuthContract): Promise<void> {
    try {
      let userId

      if (auth.user instanceof User) {
        userId = auth?.user?.id || ''
      }

      const user: User = await User.findOrFail(userId)

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
