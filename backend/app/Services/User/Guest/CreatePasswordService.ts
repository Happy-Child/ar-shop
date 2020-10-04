import User from "App/Models/User";
import ResetPasswordsToken from "App/Models/ResetPasswordsToken";

export default class CreatePasswordService {
  public async run(token: string, password: string): Promise<void> {
    try {
      const actionExists: ResetPasswordsToken = await ResetPasswordsToken.findByOrFail('token', token)

      const user: User = await User.findByOrFail('email', actionExists.email)
      user.password = password

      await user.save()
    } catch (e) {
      throw e
    }
  }
}
