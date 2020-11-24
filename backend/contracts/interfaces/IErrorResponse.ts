export default interface IErrorResponse {
  status: number,
  error: {
    code: string,
    data: string | undefined,
  }
}
