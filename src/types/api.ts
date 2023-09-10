export type ApiPagination = {
  count: number;
  page: number;
  size: number;
  total_pages: number;
  total_matchings: number;
};

export type FieldError = {
  field: string;
  code: string;
  message: string[];
};

export type NonFieldError = {
  non_field_errors: string[];
};

export type ApiError = {
  status_code: number;
  message: string[];
  errors: FieldError[] | NonFieldError;
};
