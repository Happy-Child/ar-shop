import EUserRoles from "Contracts/enums/userRoles";

export default interface IGetUsersServiceParams {
  type: EUserRoles | undefined,
  search: string | undefined,
  sort_by: string,
  sort_desc: boolean,
  page: number,
  limit: number,
}
