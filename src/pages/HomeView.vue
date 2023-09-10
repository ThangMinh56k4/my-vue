<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <main-layout>
      <div class="my-20">
        <h1 class="tagline">
          Thanks for <br />
          <span class="accent">the see</span>
        </h1>

        <div class="flex justify-center mt-12">
          <RouterLink to="/posts">
            <el-button type="primary" size="large" plain
              >Click to experience</el-button
            >
          </RouterLink>
        </div>
      </div>
    </main-layout>
  </main>
</template>

<style scoped>
.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;
}

.accent {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
