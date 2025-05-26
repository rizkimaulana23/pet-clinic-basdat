<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Button from '../../ui/button/Button.vue';

const props = defineProps<{
    kode: string,
    jenis: string
}>();

const emit = defineEmits<{
  'delete': [id: string]
}>();

const onSubmit = () => {
  const { kode } = props;
  emit('delete', kode );
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-500 font-bold">Delete Animal Type</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah kamu yakin untuk menghapus <span class="text-red-500 font-bold">{{ jenis }}</span> dengan Kode <span class="text-red-500 font-bold">{{ kode }}</span>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500" @click="onSubmit">Confirm Deletion</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>