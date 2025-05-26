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
import Button from '../ui/button/Button.vue';
import { deleteVaccine } from '@/services/vaccines.services';


const emit = defineEmits<{
  (e: 'fetch'): void
}>();

const props = defineProps<{
    kodeVaksin: string,
    namaVaksin: string
}>();

const handleDelete = async () => {
  await deleteVaccine(props.kodeVaksin);
  emit('fetch')
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-500 font-bold">Delete Vaccine</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah kamu yakin untuk menghapus Vaksin <span class="text-red-500 font-bold">{{ namaVaksin }}</span> dengan Kode <span class="text-red-500 font-bold">{{ kodeVaksin }}</span>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500" @click="handleDelete">Confirm Deletion</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>