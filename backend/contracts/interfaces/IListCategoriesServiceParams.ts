export default interface IGetUsersServiceParams {
  search: string | undefined,
  sort_by: string,
  sort_desc: boolean | undefined,
  page: number | undefined,
  limit: number | undefined,
}
