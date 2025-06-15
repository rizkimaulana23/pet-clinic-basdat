<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea/Textarea.vue';

const props = defineProps<{
    idKunjungan: string
}>();

const emit = defineEmits<{
    close: [];
}>();

const formSchema = toTypedSchema(z.object({
    idKunjungan: z.string({
        required_error: "Id Kunjungan tidak boleh kosong"
    }),
    suhu: z.number({
        required_error: "Suhu tidak boleh kosong"
    }).positive("Suhu harus bernilai positif"),
    beratBadan: z.number({
        required_error: "Berat badan tidak boleh kosong"
    }).nonnegative("Berat badan tidak boleh negatif"),
    catataMedis: z.string().optional()
}));

const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
        idKunjungan: props.idKunjungan
    }
});

const isOpen = ref(true);

const handleOpenChange = (newState: boolean) => {
    isOpen.value = newState;
    if (!newState) {
        resetForm();
        emit('close');
    }
};

const onSubmit = handleSubmit(async () => {
    try {
        // Call your service to create rekam medis
        // await createRekamMedis({...values});

        toast.success("Successfully created Rekam Medis");
        handleOpenChange(false);
    } catch (error: any) {
        toast.error("Failed to create Rekam Medis", {
            description: error.message
        });
    }
});

onMounted(() => {
    isOpen.value = true;
});
</script>

<template>
    <Dialog :open="isOpen" @update:open="handleOpenChange">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Rekam Medis</DialogTitle>
            </DialogHeader>

            <div class="overflow-y-auto pr-1 max-h-[calc(80vh-10rem)] ml-[-0.25rem]">
                <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4 mt-3 overflow-y-auto p-1">
                    <FormField v-slot="{ componentField }" name="idKunjungan">
                        <FormItem>
                            <FormLabel>Id Kunjungan</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Id Kunjungan" type="text" v-bind="componentField" disabled/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="suhu">
                        <FormItem>
                            <FormLabel>Suhu</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Suhu" type="number" v-bind="componentField"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="beratBadan">
                        <FormItem>
                            <FormLabel>Berat Badan</FormLabel>
                            <FormControl>
                                <Input placeholder="Input Berat Badan" type="number" v-bind="componentField"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="catatanMedis">
                        <FormItem>
                            <FormLabel>Catatan Medis</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Input Catatan Medis" type="text" v-bind="componentField"></Textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>
            </div>

            <DialogFooter>
                <Button type="button" variant="outline" @click="handleOpenChange(false)">Cancel</Button>
                <Button type="button" @click="onSubmit">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>