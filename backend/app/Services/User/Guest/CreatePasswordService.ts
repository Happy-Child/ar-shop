import User from "App/Models/User";
import ResetPasswordsToken from "App/Models/ResetPasswordsToken";

export default class CreatePasswordService {
  public async run(token: string, password: string): Promise<void> {
    try {
      const actionExists: ResetPasswordsToken = await ResetPasswordsToken.findByOrFail('token', token)
      const email: string = actionExists.email

      const user: User = await User.findByOrFail('email', email)
      user.password = password

      await user.save()

      ResetPasswordsToken
        .query()
        .where('email', email)
        .delete()
        .then()
        .catch((e => { throw e }))
    } catch (e) {
      throw e
    }
  }
}
