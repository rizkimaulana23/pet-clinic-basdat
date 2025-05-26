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

const emit = defineEmits<{
  'delete': [kode: string]
}>();

const props = defineProps<{
    nama: string,
    kode: string
}>();

const handleDelete = () => {
  emit('delete', props.kode);
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-500 font-bold">Delete Medicine</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah kamu yakin untuk menghapus Obat <span class="text-red-500 font-bold">{{ nama }}</span> dengan Kode <span class="text-red-500 font-bold">{{ kode }}</span>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500" @click="handleDelete">Confirm Deletion</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>