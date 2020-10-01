// import Application from '@ioc:Adonis/Core/Application'
// import {MultipartFileContract} from "@ioc:Adonis/Core/BodyParser";
import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import TokensVerifiedEmail from "App/Models/TokensVerifiedEmail";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

export default class RegistrationService {
  public async run({name, phone, email, password, sex}: User, auth: AuthContract): Promise<void> {
    try {
      const user = new User()

      if (phone) user.phone = phone
      if (sex) user.sex = sex
      user.name = name
      user.email = email
      user.password = password

      await user.save()

      const {token} = await auth.use('api').generate(user, {
        expiresIn: '10m',
      })

      const actionTokensVerifiedEmail = new TokensVerifiedEmail()
      actionTokensVerifiedEmail.email = email
      actionTokensVerifiedEmail.token = token
      await actionTokensVerifiedEmail.save()

      const url = `${Env.get('APP_URL')}/verified-email?token=${token}`

      await Mail.sendLater((message) => {
        message
          .to(email)
          .subject(`${Env.get('APP_NAME')} - Email confirmation`)
          .htmlView('emails/verified_email', {url})
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
