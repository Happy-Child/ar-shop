import {ModelObject} from "@ioc:Adonis/Lucid/Model";
import User from "App/Models/User";
import {E_EMAIL_NOT_VERIFIED} from "App/Helpers/errorTypes";
import {AuthContract} from "@ioc:Adonis/Addons/Auth";

interface ILoginParams {
  auth: AuthContract,
  email: string,
  password: string,
}

export default class LoginService {
  public async run({auth, email, password}: ILoginParams): Promise<object> {
    try {
      const emailVerified = await User.thisEmailVerified(email)

      if (!emailVerified) {
        throw {
          code: E_EMAIL_NOT_VERIFIED
        }
      }

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '10 days',
      })
      const user: ModelObject = token.user

      return {
        token: token.toJSON(),
        user,
      } as object
    } catch (e) {
      throw e
    }
  }
}
