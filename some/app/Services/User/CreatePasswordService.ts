import User from "App/Models/User";
import ResetPassword from "App/Models/ResetPassword";

export default class CreatePasswordService {
  public async run(token: string, password: string): Promise<void> {
    try {
      const actionExists: ResetPassword = await ResetPassword.findByOrFail('token', token)

      const user: User = await User.findByOrFail('email', actionExists.email)
      user.password = password

      await user.save()
    } catch (e) {
      throw e
    }
  }
}
