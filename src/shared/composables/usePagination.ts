import { PER_PAGE } from '@/shared/constant';
import { type ApiPagination, type AppPagination } from '@/types';
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { asNumber } from '../utils';

export type UsePaginationOptions = {
  defaultPage?: number;
  scrollToTop?: boolean | ScrollBehavior;
  readQuery?: boolean | string;
  writeQuery?: boolean;
  size?: number;
  perPage?: number;
  count?: number;
  totalCount?: number;
};

export function createPagination(
  options?: Partial<ApiPagination> | Partial<AppPagination>
): AppPagination {
  const perPage =
    (options as ApiPagination)?.size ??
    (options as AppPagination)?.perPage ??
    PER_PAGE;

  const totalCount =
    (options as ApiPagination)?.count ??
    (options as AppPagination)?.totalCount ??
    0;

  return {
    page: options?.page ?? 1,
    perPage,
    totalCount,
    pageCount: Math.ceil(totalCount / perPage),
  };
}

export function usePagination({
  defaultPage = 1,
  readQuery = 'page',
  writeQuery = true,
  scrollToTop = true,
  ...options
}: UsePaginationOptions = {}) {
  const route = useRoute();
  const router = useRouter();

  const queryName = typeof readQuery === 'string' ? readQuery : 'page';

  const routePage = computed(() =>
    readQuery ? asNumber(route.query[queryName]) : undefined
  );

  const pagination = ref<AppPagination>(
    createPagination({ ...options, page: routePage.value ?? defaultPage })
  );

  const page = computed({
    get() {
      return pagination.value.page;
    },
    set(value: number) {
      pagination.value.page = value;
    },
  });

  const isLastPage = computed(() => {
    return (
      pagination.value.pageCount > 0 &&
      pagination.value.pageCount === page.value
    );
  });

  const hasPrevPage = computed(() => page.value - 1 >= 1);

  const prevPage = computed(() => (hasPrevPage.value ? page.value - 1 : null));

  watch(routePage, (value) => {
    pagination.value.page = value ?? 1;
  });

  watch(page, async (value) => {
    await nextTick();
    const valueFromRoute = route.query[queryName];
    if (value === Number(valueFromRoute)) return;

    if (writeQuery) {
      const query = { ...route.query, [queryName]: value };
      if (value === 1) delete query[queryName];
      router.push({ query });
    }

    if (scrollToTop && typeof window !== 'undefined') {
      const behavior = typeof scrollToTop === 'string' ? scrollToTop : 'auto';
      window.scrollTo({ top: 0, left: 0, behavior });
    }
  });

  return {
    pagination,
    createPagination,
    isLastPage,
    prevPage,
  };
}
