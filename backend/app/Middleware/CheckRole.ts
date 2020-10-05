import {E_ACCESS_DENIED} from "App/Helpers/errorTypes";

import IErrorResponse from "Contracts/interfaces/IErrorResponse";

import {AuthContract} from "@ioc:Adonis/Addons/Auth";
import {ResponseContract} from "@ioc:Adonis/Core/Response";

import User from "App/Models/User";

import EUserRoles from "Contracts/enums/userRoles";

export default class CheckRoleMiddleware {
  protected readonly membersRoles: EUserRoles[] = []

  public async handle (
    {auth, response}: {auth: AuthContract, response: ResponseContract},
    next: () => Promise<void>,
  ) {
    try {
      let userRole: number = 0

      if (auth.user instanceof User && auth.user?.role) {
        userRole = Number(auth.user.role)
      }

      if (!this.membersRoles.includes(userRole)) {
        throw {
          error: {
            code: E_ACCESS_DENIED,
          }
        } as IErrorResponse
      }

      await next()
    } catch (e) {
      response.status(404).send(e)
    }
  }
}
