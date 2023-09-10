<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { PER_PAGE } from '@/shared/constant';

defineOptions({
  name: 'CommonPagination',
});

const route = useRoute();
const router = useRouter();

type Props = {
  modelValue?: number;
  disabled?: boolean;
  total?: number;
  pageSize?: number;
  useQuery?: string | boolean;
  defaultPage?: number;
  scrollToTop: boolean | ScrollBehavior;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  disabled: false,
  useQuery: false,
  pageSize: PER_PAGE,
  total: 0,
  defaultPage: 1,
  scrollToTop: false,
});

const pageQueryName = computed(() => {
  const { useQuery } = props;
  if (useQuery === true || useQuery === '') return 'page';
  if (useQuery === false) return '';
  return useQuery;
});

const pageQuery = computed(() =>
  route.query[pageQueryName.value]
    ? Number(route.query[pageQueryName.value])
    : props.defaultPage
);

const emit = defineEmits<{
  (e: 'update:modelValue', value?: number): void;
}>();

function onScrollToTop() {
  if (props.scrollToTop && typeof window !== 'undefined') {
    const behavior =
      typeof props.scrollToTop === 'string' ? props.scrollToTop : 'auto';
    window.scrollTo({ top: 0, left: 0, behavior });
  }
}

function onUseQuery(page: number) {
  if (props.useQuery && pageQueryName.value) {
    router.push({
      query: {
        ...route.query,
        [pageQueryName.value]: String(page),
      },
    });
  }
}

const currentPage = computed({
  get() {
    return pageQueryName.value
      ? pageQuery.value
      : props.modelValue ?? props.defaultPage;
  },
  set(value: number) {
    emit('update:modelValue', value);
    onScrollToTop();
    onUseQuery(value);
  },
});
</script>

<template>
  <el-pagination
    v-model:current-page="currentPage"
    background
    :disabled="disabled"
    :total="total"
    :page-size="pageSize"
    layout="prev, pager, next"
  />
</template>
