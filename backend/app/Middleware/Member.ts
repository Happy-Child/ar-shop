import EUserRoles from "Contracts/enums/userRoles";
import CheckRole from "App/Middleware/CheckRole";

export default class MemberMiddleware extends CheckRole {
  protected readonly membersRoles: EUserRoles[] = [
    EUserRoles.ROLE_SUPER_ADMIN,
    EUserRoles.ROLE_ADMIN,
    EUserRoles.ROLE_MANAGER,
  ]
}
