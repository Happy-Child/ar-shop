export type TSuccessResponse = {
  status: number;
  data?: object;
};

export type TErrorResponse = {
  error: {
    code: string;
    data: any;
  };
};
