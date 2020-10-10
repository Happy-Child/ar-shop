export default interface IListOrdersServiceParams {
  from_date: Date | undefined,
  to_date: Date | undefined,
  sort_by: string,
  sort_desc: boolean | undefined,
  page: number | undefined,
  limit: number | undefined,
}
