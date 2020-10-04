import User from "App/Models/User";
import Mail from "@ioc:Adonis/Addons/Mail";
import Env from "@ioc:Adonis/Core/Env";
import VerifiedEmailsToken from "App/Models/VerifiedEmailsToken";
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

      this._sendMailForConfirmation(auth, user)
        .then()
        .catch(e => {
          throw e
        })
    } catch (e) {
      throw e
    }
  }
  private async _sendMailForConfirmation (auth: AuthContract, user: User): Promise<void> {
    const {token} = await auth.use('api').generate(user, {
      expiresIn: '10m',
    })

    const actionVerifiedEmail = new VerifiedEmailsToken()
    actionVerifiedEmail.email = user.email
    actionVerifiedEmail.token = token
    await actionVerifiedEmail.save()

    const url = `${Env.get('APP_URL')}/verified-email?token=${token}`

    await Mail.sendLater((message) => {
      message
        .to(user.email)
        .subject(`${Env.get('APP_NAME')} - Email confirmation`)
        .htmlView('emails/verified_email', {url})
    })
  }
}
