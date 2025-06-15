<script setup lang="ts">
import { AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogHeader from '@/components/ui/alert-dialog/AlertDialogHeader.vue';
import AlertDialogTitle from '@/components/ui/alert-dialog/AlertDialogTitle.vue';
import AlertDialogTrigger from '@/components/ui/alert-dialog/AlertDialogTrigger.vue';
import { Button } from '@/components/ui/button';
import { deleteVisits } from '@/services/visits.services';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const props = defineProps<{
    idKunjungan: string
}>();

const onSubmit = async () => {
    try {
        await deleteVisits(props.idKunjungan);
        toast.success("Succesfully deleted the Visits");
    } catch (error: any) {
        toast.error("Failed to delete the Visits", {
            description: error.message
        })
    }
}

const isOpen = ref(false);

const handleOpenChange = (newValue: boolean) => {
    isOpen.value = newValue;
}
</script>

<template>
    <AlertDialog :open="isOpen" @update:open="handleOpenChange">
        <AlertDialogTrigger>
            <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle class="text-red-500 font-bold">Delete Visits</AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah kamu yakin untuk menghapus Kunjungan dengan Id <span class="font-semibold">{{ props.idKunjungan }}</span>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction class="bg-red-500" @click="onSubmit">
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>