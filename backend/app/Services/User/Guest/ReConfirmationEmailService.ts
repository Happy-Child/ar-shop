import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import User from "App/Models/User";
import {E_USER_NOT_FOUND} from "../../../../lib/errorTypes";
import VerifiedEmailsToken from "App/Models/VerifiedEmailsToken";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

export default class ReConfirmationEmailService {
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

      const actionVerifiedEmail = new VerifiedEmailsToken()
      actionVerifiedEmail.email = email
      actionVerifiedEmail.token = token
      await actionVerifiedEmail.save()

      const url = `${Env.get('APP_URL')}/verified-email?token=${token}`

      await Mail.sendLater((message) => {
        message
          .to(email)
          .subject(`${Env.get('APP_NAME')} - Email confirmation`)
          .htmlView('emails/verified_email', {url})
      })
    } catch (e) {
      console.log(e)
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
