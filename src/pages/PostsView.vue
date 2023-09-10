<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useCachePostsStore } from '@/stores/cachePosts';
import { serviecs } from '@/shared/serviecs';
import { usePaginate } from '@/shared/composables/usePaginate';
import PostsAction from '@/components/posts/PostsAction.vue';
import PostsTable from '@/components/posts/PostsTable.vue';
import Pagination from '@/components/common/Pagination.vue';
import { IconPlus } from '@/components/icons';

const postsStore = useCachePostsStore();
const { posts } = storeToRefs(postsStore);
const { setPosts, removePost, updatePost } = postsStore;

const pending = ref(false);

const router = useRouter();

const fetchData = async () => {
  pending.value = true;
  try {
    const result = await serviecs().posts.index();
    setPosts(result?.data || []);
  } finally {
    pending.value = false;
  }
};

fetchData();

function onRefresh() {
  router.push({
    query: {},
  });
  fetchData();
}

const { items, pagination, isLastPage, prevPage } = usePaginate(posts);

function onRemove(id: number) {
  const filteredItems = items.value.filter((item) => item.id !== id);
  if (isLastPage.value && !filteredItems.length) {
    pagination.value.page = prevPage.value || 1;
  }
  removePost(id);
}
</script>

<template>
  <main-layout>
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold mb-2">POSTS</h1>
      <PostsAction @reload="onRefresh">
        <template #trigger="{ show }">
          <el-button :icon="IconPlus" type="primary" plain @click="show"
            >Create</el-button
          >
        </template>
      </PostsAction>
    </div>

    <PostsTable
      :posts="items"
      :pending="pending"
      @remove-post="onRemove"
      @update-post="updatePost"
    />
    <div class="mt-4 flex justify-center">
      <Pagination
        v-model="pagination.page"
        class="mt-5"
        :page-size="pagination.perPage"
        :total="pagination.totalCount"
      />
    </div>
  </main-layout>
</template>
@/stores/cachePosts
