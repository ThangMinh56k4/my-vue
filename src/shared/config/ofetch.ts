import { ofetch } from 'ofetch';
import { BASE_URL } from '@/shared/constant';

export type ApiFetchState = 'idle' | 'pending' | 'resolved' | 'error';

export type ApiFetchReturn<T> = {
  status: ApiFetchState;
  data: T | null;
  error: any;
};

export type ApiFetchOptions = any; // TODO: add type;

const API_BASE_URL = import.meta.env.API_BASE_URL;

export async function useApiFetch<T = any>(
  url: string,
  fetchOptions?: ApiFetchOptions
): Promise<ApiFetchReturn<T>> {
  let status = 'idle' as ApiFetchState;
  let data = null as T | null;
  const error = null as any;

  try {
    const resp = await ofetch<T>(url, {
      baseURL: API_BASE_URL ?? BASE_URL,
      retry: false,

      headers: {
        ...fetchOptions?.headers,
      },
      onResponseError: async (context) => {
        const { response } = context;

        const { status } = response || {};
        switch (status) {
          case 408:
            console.log('Request Timeout');
            break;

          case 500:
            console.log(' Internal Server Error');
            break;

          default:
            console.log('error');
            break;
        }
      },
      ...fetchOptions,
    });
    data = resp;
    status = 'resolved' as ApiFetchState;
  } catch (err) {
    error.value = err;
    status = 'error' as ApiFetchState;
  }

  return Promise.resolve({
    status,
    data,
    error,
  });
}
