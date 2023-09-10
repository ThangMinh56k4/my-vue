<script lang="ts" setup>
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { serviecs } from '@/shared/serviecs';
import { type Post } from '@/types';

import { IconEdit } from '@/components/icons';

interface Props {
  action: 'PUT' | 'CREATE';
  post?: Post;
}

const props = withDefaults(defineProps<Props>(), {
  post: undefined,
  action: 'CREATE',
});

const emit = defineEmits<{
  (e: 'reload'): void;
  (e: 'update-success', value: Post): void;
  (e: 'create-success', value: Post): void;
}>();

const dialogVisible = ref(false);
const pending = ref(false);

const formLabelAlign = ref({
  name: '',
  region: '',
  type: '',
});

const validationSchema = toTypedSchema(
  zod.object({
    title: zod
      .string({ required_error: 'This is required' })
      .nonempty()
      .min(10, { message: 'Title must be greater than or equal to 10' }),
    body: zod
      .string({ required_error: 'This is required' })
      .nonempty()
      .min(10, { message: 'Body must be greater than or equal to 10' }),
  })
);

const { handleSubmit, errors, setValues, defineComponentBinds, resetForm } =
  useForm({
    validationSchema,
  });

const title = defineComponentBinds('title');
const body = defineComponentBinds('body');

function onHiden() {
  dialogVisible.value = false;
}

function showDialog() {
  dialogVisible.value = true;
  if (props.action === 'PUT') {
    setValues({
      title: props.post!.title,
      body: props.post!.body,
    });
  }
}

async function onEdit(data: Record<string, string>) {
  pending.value = true;
  try {
    await serviecs().posts.update(props.post!.id, data);
    ElNotification({
      message: 'Edited post successfully',
      type: 'success',
      offset: 80,
    });
    onHiden();

    emit('update-success', { id: props.post!.id, ...data } as Post);
  } catch (error) {
    ElNotification({
      message: 'Edit post failed',
      type: 'error',
      offset: 80,
    });
    // TODO: handle setErrors
  } finally {
    setTimeout(() => {
      pending.value = false;
    }, 1500);
  }
}

async function onCreate(data: Record<string, string>) {
  pending.value = true;
  try {
    await serviecs().posts.create(data);
    ElNotification({
      message: 'Created post successfully',
      type: 'success',
      offset: 80,
    });
    onHiden();
    emit('reload');
  } catch (error) {
    ElNotification({
      message: 'Created post failed',
      type: 'error',
      offset: 80,
    });
    // TODO: handle setErrors
  } finally {
    setTimeout(() => {
      pending.value = false;
    }, 1500);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSubmit = handleSubmit(async (data, { setErrors }) => {
  if (pending.value) return;

  if (props.action === 'CREATE') {
    onCreate(data);
  } else {
    onEdit(data);
  }
});
</script>

<template>
  <div>
    <slot name="trigger" :show="showDialog">
      <el-button
        class="!border-gray-600 !bg-transparent !text-gray-600"
        :icon="IconEdit"
        circle
        @click="showDialog"
      />
    </slot>

    <client-only>
      <el-dialog
        v-model="dialogVisible"
        title="Edit post"
        width="550px"
        append-to-body
        @closed="resetForm"
      >
        <div>
          <el-form
            :model="formLabelAlign"
            label-position="top"
            label-width="100px"
            novalidate
            @submit.prevent="onSubmit"
          >
            <el-form-item label="Title" :error="errors.title" required>
              <el-input v-bind="title" />
            </el-form-item>
            <el-form-item label="Body" :error="errors.body" required>
              <el-input v-bind="body" :rows="5" type="textarea" />
            </el-form-item>

            <div class="flex justify-center mt-8">
              <el-button @click="onHiden">Cancel</el-button>
              <el-button type="primary" native-type="submit" :loading="pending">
                Save
              </el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </client-only>
  </div>
</template>
