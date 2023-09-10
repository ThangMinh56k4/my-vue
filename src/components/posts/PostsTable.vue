<script lang="ts" setup>
import { computed } from 'vue';
import { ElNotification } from 'element-plus';

import { serviecs } from '@/shared/serviecs';
import { type Post } from '@/types';
import { IconTrash } from '@/components/icons';
import PostsAction from './PostsAction.vue';

interface Props {
  posts: Post[];
  pending: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update-post', value: Post): void;
  (e: 'remove-post', value: number): void;
}>();

const tableData = computed(() => props.posts);

const onDelete = async (id: number) => {
  try {
    await serviecs().posts.delete(id);
    ElNotification({
      message: 'Delete post successfully',
      type: 'success',
      offset: 80,
    });
    emit('remove-post', id);
  } catch (error) {
    ElNotification({
      message: 'Delete post failed',
      type: 'error',
      offset: 80,
    });
  }
};
</script>

<template>
  <el-table
    :data="tableData"
    v-loading="pending"
    style="width: 100%"
    class="vertical-align-top"
    stripe
  >
    <el-table-column prop="title" label="Title" min-width="200" />
    <el-table-column label="Body" min-width="200">
      <template #default="scope">
        <span class="line-clamp-5 whitespace-pre-line" :title="scope.row.body">
          {{ scope.row.body }}
        </span>
      </template>
    </el-table-column>

    <el-table-column v-slot="scope" width="150">
      <div class="flex justify-center">
        <PostsAction
          :post="scope.row"
          :action="'PUT'"
          @update-success="$emit('update-post', $event)"
        />
        <el-popconfirm
          width="220"
          confirm-button-text="Yes"
          cancel-button-text="No"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          @confirm="onDelete(scope.row.id)"
        >
          <template #reference>
            <el-button
              class="!border-red-600 !bg-transparent !text-red-600 ml-3"
              :icon="IconTrash"
              circle
            />
          </template>
        </el-popconfirm>
      </div>
    </el-table-column>
  </el-table>
</template>
