import IErrorResponse from "Contracts/interfaces/IErrorResponse";
import User from "App/Models/User";
import {E_EVENT_NOT_REGISTERED, E_USER_NOT_UPDATED} from "App/Helpers/errorTypes";
import VerifiedEmailsToken from "App/Models/VerifiedEmailsToken";

export default class VerifyEmailService {
  public async run(token:string): Promise<void | IErrorResponse> {
    try {
      const actionExists: VerifiedEmailsToken = await VerifiedEmailsToken.findByOrFail('token', token)

      if (!actionExists) {
        throw {
          code: E_EVENT_NOT_REGISTERED
        }
      }

      const email: string = actionExists.email

      const [result]: number[] = await User
        .query()
        .where('email', email)
        .update({ verified: true })

      if (!result) {
        throw {
          code: E_USER_NOT_UPDATED
        }
      }

      VerifiedEmailsToken
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
