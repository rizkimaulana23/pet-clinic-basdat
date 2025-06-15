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

const emits = defineEmits<{
  'delete': [idKunjungan: string]
}>();

defineProps<{
    idKunjungan: string,
    idVaksin: string
}>();

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-red-500 font-bold">Delete Vaccination</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah kamu yakin untuk menghapus Vaksinasi <span class="text-red-500 font-bold">{{ idVaksin }}</span> untuk Kunjungan <span class="text-red-500 font-bold">{{ idKunjungan }}</span>?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction class="bg-red-500" @click="() => { emits('delete', idKunjungan)}">Confirm Deletion</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>