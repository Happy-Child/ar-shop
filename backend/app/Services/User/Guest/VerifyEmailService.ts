import IErrorResponse from "Contracts/interfaces/IErrorResponse";
import User from "App/Models/User";
import {E_EVENT_NOT_REGISTERED, E_USER_NOT_UPDATED} from "../../../../lib/errorTypes";
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

      const [result]: number[] = await User
        .query()
        .where('email', actionExists.email)
        .update({ verified: true })

      if (!result) {
        throw {
          code: E_USER_NOT_UPDATED
        }
      }
    } catch (e) {
      throw e
    }
  }
}
