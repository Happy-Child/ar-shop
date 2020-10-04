import EUserRoles from "Contracts/enums/userRoles";
import CheckRole from "App/Middleware/CheckRole";

export default class AdminMiddleware extends CheckRole {
  protected readonly membersRoles: EUserRoles[] = [
    EUserRoles.ROLE_SUPER_ADMIN,
    EUserRoles.ROLE_ADMIN,
  ]
}
