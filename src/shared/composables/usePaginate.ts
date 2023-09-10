import { type ApiPagination, type AppPagination } from '@/types';
import {
  createPagination,
  usePagination,
  type UsePaginationOptions,
} from './usePagination';
import { computed, watch, type Ref } from 'vue';

export type PaginateOptions = UsePaginationOptions & {
  defaultPage?: number;
  perPage?: number;
};

export function usePaginate<T>(
  list: Ref<T[]>,
  options: Partial<ApiPagination> | Partial<AppPagination> = {}
) {
  const { pagination, prevPage, isLastPage } = usePagination(options);

  const items = computed(() => {
    const start = (pagination.value.page - 1) * pagination.value.perPage;
    const end = start + pagination.value.perPage;

    return list.value.slice(start, end);
  });

  watch(
    list,
    (values) => {
      pagination.value = createPagination({
        page: pagination.value.page,
        perPage: pagination.value.perPage,
        totalCount: values.length,
      });
    },
    { deep: true }
  );

  return {
    items,
    pagination,
    prevPage,
    isLastPage,
  };
}
