import User from "App/Models/User";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import VerifiedEmailsToken from "App/Models/VerifiedEmailsToken";
import Env from "@ioc:Adonis/Core/Env";
import Mail from "@ioc:Adonis/Addons/Mail";
import EUserRoles from "Contracts/enums/userRoles";
import AdminService from "App/Services/User/Admin/AdminService";

export default class UserCreateService extends AdminService {
  public async run(
    {name, phone, email, password, sex, role, verified}: User, auth: AuthContract
  ): Promise<void> {
    try {
      const authUser: User | undefined = auth.use('api').user
      const roleAuthUser: number = authUser?.role || 0

      this.checkPermissions(roleAuthUser, Number(role))

      const user: User = new User()

      if (phone) user.phone = phone
      if (sex) user.sex = sex
      user.role = role || EUserRoles.ROLE_USER
      user.name = name
      user.email = email
      user.password = password
      user.verified = verified

      await user.save()

      if (!verified) {
        this._sendMailForConfirmation(auth, user, password)
          .then()
          .catch(e => {
            throw e
          })
      }
    } catch (e) {
      throw e
    }
  }

  private async _sendMailForConfirmation (auth: AuthContract, user: User, password: string): Promise<void> {
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
        .htmlView('emails/verified_email_for_member', {
          url,
          email: user.email,
          password,
        })
    })
  }
}
