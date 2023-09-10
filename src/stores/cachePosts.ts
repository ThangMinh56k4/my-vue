import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

import { type Post } from '@/types';

export type CacheDataState = {
  posts: Ref<Post[]>;
};

export const useCachePostsStore = defineStore('cacheData', {
  state: (): CacheDataState => ({
    posts: ref([]),
  }),

  actions: {
    setPosts(posts: Post[]) {
      this.posts = posts;
    },

    updatePost(post: Post) {
      const { id, title, body } = post;
      const index = this.posts.findIndex((item) => item.id === id);

      if (index === -1) return;

      this.posts[index].body = body;
      this.posts[index].title = title;
    },

    removePost(id: number) {
      const index = this.posts.findIndex((item) => item.id === id);

      if (index === -1) return;

      this.posts.splice(index, 1);
    },
  },
});
