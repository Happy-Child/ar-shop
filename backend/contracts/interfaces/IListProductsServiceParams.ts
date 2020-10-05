export default interface IGetUsersServiceParams {
  category_id: number | undefined,
  price_min: number | undefined,
  price_max: number | undefined,
  search: string | undefined,
  sort_by: string,
  sort_desc: boolean | undefined,
  page: number | undefined,
  limit: number | undefined,
}
