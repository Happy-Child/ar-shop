import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IErrorResponse from "Contracts/interfaces/IErrorResponse";
import {E_FOR_UNAUTHORIZED_USERS} from "../../lib/errorTypes";

export default class GuestMiddleware {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const isAuth = await auth.check()

      if (isAuth) {
        throw {
          error: {
            code: E_FOR_UNAUTHORIZED_USERS,
          }
        } as IErrorResponse
      }

      await next()
    } catch (e) {
      response.status(404).send(e)
    }
  }
}
