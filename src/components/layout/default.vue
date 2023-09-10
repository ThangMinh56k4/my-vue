<script setup lang="ts">
import { TheNavbar, TheFooter } from '../shared';

defineOptions({
  name: 'default-layout'
})
</script>

<template>
  <div class="common-layout">
    <el-container class="min-h-screen">
      <el-header>
        <the-navbar />
      </el-header>
      <el-main>
        <slot />
      </el-main>
      <the-footer />
    </el-container>
  </div>
</template>

<style scoped>

</style>
