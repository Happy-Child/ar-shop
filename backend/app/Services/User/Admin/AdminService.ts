import EUserRoles from "Contracts/enums/userRoles";
import {E_ACCESS_DENIED} from "App/Helpers/errorTypes";

export default class AdminService {
  private readonly _forbiddenRolesToUpdate: EUserRoles[] = [
    EUserRoles.ROLE_SUPER_ADMIN
  ]

  protected readonly _forbiddenRolesToUpdateForRole: {[key: string]: EUserRoles[]} = {
    [EUserRoles.ROLE_SUPER_ADMIN]: [],
    [EUserRoles.ROLE_ADMIN]: [EUserRoles.ROLE_ADMIN]
  }

  protected checkPermissions (roleAuthUser: number, checkedRole: number): void {
    if (this._forbiddenRolesToUpdate.includes(checkedRole)) {
      throw {
        code: E_ACCESS_DENIED
      }
    }

    if (this._forbiddenRolesToUpdateForRole[roleAuthUser].includes(checkedRole)) {
      throw {
        code: E_ACCESS_DENIED
      }
    }
  }
}
