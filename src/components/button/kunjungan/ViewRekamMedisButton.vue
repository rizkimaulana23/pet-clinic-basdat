<script setup lang="ts">
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import AlertDialog from '@/components/ui/alert-dialog/AlertDialog.vue';
import AlertDialogAction from '@/components/ui/alert-dialog/AlertDialogAction.vue';
import AlertDialogCancel from '@/components/ui/alert-dialog/AlertDialogCancel.vue';
import AlertDialogContent from '@/components/ui/alert-dialog/AlertDialogContent.vue';
import AlertDialogFooter from '@/components/ui/alert-dialog/AlertDialogFooter.vue';
import AlertDialogTrigger from '@/components/ui/alert-dialog/AlertDialogTrigger.vue';
import Button from '@/components/ui/button/Button.vue';
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import CreateRekamMedisButtonv from './CreateRekamMedisButtonv.vue';
import { computed, ref } from 'vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import Input from '@/components/ui/input/Input.vue';
import  Textarea from '@/components/ui/textarea/Textarea.vue';


interface Props {
    idKunjungan: string,
    suhu: number | null,
    beratBadan: number | null,
    catatanMedis?: string,
}

const props = defineProps<{
    data: Props
}>();

const showCreateRekamMedis = ref(false);
const alertDialogOpen = ref(false);

const handleCreateRekamMedis = () => {
    alertDialogOpen.value = false; 
    showCreateRekamMedis.value = true;
}

// Optional: Handle close event from CreateRekamMedisButtonv
const handleCloseCreateDialog = () => {
    showCreateRekamMedis.value = false;
}

const isNull = computed(() => {
    return props.data.suhu === null || props.data.beratBadan === null  
})

</script>

<template>
    <AlertDialog v-model:open="alertDialogOpen">
        <AlertDialogTrigger as-child>
            <Button variant="secondary">View Rekam Medis</Button>
        </AlertDialogTrigger>
        <AlertDialogContent class="sm:max-w-[425px]">
            <AlertDialogHeader>
                <DialogTitle :v-for="isNull">Rekam Medis Tidak Tersedia</DialogTitle>
                <DialogTitle :v-for="!isNull">Rekam Medis</DialogTitle>
                <DialogDescription :v-for="isNull">
                    Maaf, sepertinya belum ada rekam medis yang dibuat untuk Kunjungan ini.
                </DialogDescription>
            </AlertDialogHeader>
            <div :v-for="!isNull">
                <FormItem>
                    <FormLabel>Suhu</FormLabel>
                    <Input type="number" :value="props.data.suhu"/>
                </FormItem>
                <FormItem>
                    <FormLabel>Berat Badan</FormLabel>
                    <Input type="text" :value="props.data.beratBadan"/>
                </FormItem>
                <FormItem>
                    <FormLabel>Catatan Medis</FormLabel>
                    <Textarea :value="props.data.catatanMedis"></Textarea>
                </FormItem>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>Ok</AlertDialogCancel>
                <AlertDialogAction @click="handleCreateRekamMedis">
                    Create Rekam Medis
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    <CreateRekamMedisButtonv :id-kunjungan="props.data.idKunjungan" v-if="showCreateRekamMedis" @close="handleCloseCreateDialog" />
</template>