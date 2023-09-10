import { createRouter, createWebHistory } from 'vue-router';
import { HomeView, PostsView } from '@/pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
    },
  ],
});

export default router;
