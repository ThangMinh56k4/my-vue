import { type ApiFetchOptions, useApiFetch } from '../config/ofetch';

export default class RestService<T = any> {
  constructor(
    protected resource: string,
    protected options?: ApiFetchOptions
  ) {}

  index<R = T>(params?: Record<string, any>, extras: ApiFetchOptions = {}) {
    return useApiFetch<R[]>(`${this.resource}`, {
      query: params,
      immediate: true,
      ...this.options,
      ...extras,
    });
  }

  create<R = T>(data: Partial<T> | FormData, extras: ApiFetchOptions = {}) {
    return useApiFetch<R>(`${this.resource}`, {
      body: data,
      method: 'POST',
      immediate: true,
      ...this.options,
      ...extras,
    });
  }

  update<R = T>(
    id: number | string,
    data: Partial<T> | FormData,
    extras: ApiFetchOptions = {}
  ) {
    return useApiFetch<R>(`${this.resource}/${id}`, {
      body: data,
      method: 'PUT',
      immediate: true,
      ...this.options,
      ...extras,
    });
  }

  delete<R = T>(id: number | string, extras: ApiFetchOptions = {}) {
    return useApiFetch<R>(`${this.resource}/${id}`, {
      method: 'DELETE',
      immediate: true,
      ...this.options,
      ...extras,
    });
  }
}
