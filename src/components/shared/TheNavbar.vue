<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { IconLogo } from '@/components/icons';
import { NAVBAR_DATA } from '@/shared/constant';

const route = useRoute();

const activeIndex = computed(() => {
  return route.name;
});
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="home">
      <RouterLink to="/"
        ><el-icon size="56"><icon-logo /></el-icon
      ></RouterLink>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item
      v-for="{ key, name, path } in NAVBAR_DATA"
      :key="key"
      :index="key"
      class="min-h-15"
    >
      <RouterLink :to="path">{{ name }}</RouterLink>
    </el-menu-item>
  </el-menu>
</template>
