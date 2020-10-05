import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {E_NOT_AUTHORIZED} from "App/Helpers/errorTypes";
import IErrorResponse from "Contracts/interfaces/IErrorResponse";

export default class AuthMiddleware {
  protected redirectTo = '/login'

  protected async authenticate(auth: HttpContextContract['auth'], guards: any[]) {
    for (let guard of guards) {
      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        return true
      }
    }

    throw {
      error: {
        code: E_NOT_AUTHORIZED,
      }
    } as IErrorResponse
  }

  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>, customGuards: string[]) {
    try {
      const guards = customGuards.length ? customGuards : [auth.name]
      await this.authenticate(auth, guards)
      await next()
    } catch (e) {
      response.status(404).send(e)
    }
  }
}
