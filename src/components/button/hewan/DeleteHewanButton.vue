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
    namaHewan: string,
    namaPemilik: string,
    idPemilik: string
}>();

const emit = defineEmits<{
    'delete': [idPemilik: string, namaHewan: string]
}>();

const handleDelete = () => {
  emit('delete', props.idPemilik, props.namaHewan);
}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-500 font-bold">Delete Pet</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah kamu yakin untuk menghapus Hewan Peliharaan <span class="text-red-500 font-bold">{{ namaHewan }}</span> milik <span class="text-red-500 font-bold">{{ namaPemilik }}</span>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500" @click="handleDelete">Confirm Deletion</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>