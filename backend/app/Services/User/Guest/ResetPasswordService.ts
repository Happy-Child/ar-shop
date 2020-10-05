import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import User from "App/Models/User";
import ResetPasswordsToken from "App/Models/ResetPasswordsToken";
import {E_USER_NOT_FOUND} from "App/Helpers/errorTypes";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

export default class ResetPasswordService {
  public async run(email: string, auth: AuthContract): Promise<void> {
    try {
      const user: User | null = await User.findBy('email', email)

      if (!user) {
        throw {
          code: E_USER_NOT_FOUND
        }
      }

      const {token} = await auth.use('api').generate(user, {
        expiresIn: '10m',
      })

      const actionResetPassword = new ResetPasswordsToken()
      actionResetPassword.email = email
      actionResetPassword.token = token
      await actionResetPassword.save()

      const url = `${Env.get('APP_URL')}/reset-password?token=${token}`

      await Mail.sendLater((message) => {
        message
          .to(email)
          .subject(`${Env.get('APP_NAME')} - Reset password`)
          .htmlView('emails/reset_password', {url})
      })
    } catch (e) {
      throw e
    }
  }
  //
  // private async uploadFile (file: MultipartFileContract): Promise<any> {
  //   return await file.move(Application.tmpPath('uploads'), {
  //     name: `${new Date().getTime()}.${file.extname}`,
  //   })
  // }
}
