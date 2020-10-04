import IErrorResponse from "Contracts/interfaces/IErrorResponse";
import ISuccessResponse from "Contracts/interfaces/ISuccessResponse";

export default class BaseController {
  protected successResponse (status: number, data?: any): ISuccessResponse {
    return {
      status,
      data,
    } as ISuccessResponse
  }

  protected errorResponse (e: any): IErrorResponse {
    return {
      error: {
        code: e?.code || 'E_UNDEFINED',
        data: e?.messages?.errors
      }
    } as IErrorResponse
  }
}
