<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import { getVaccine, updateVaccines } from '@/services/vaccines.services';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const route = useRoute();
const idVaksin: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const router = useRouter();

onMounted( async () => {
    const response = await getVaccine(idVaksin);
    resetForm({
        values: {
            id: idVaksin,
            nama: response.nama,
            harga: response.harga
        }
    })
})

const formSchema = toTypedSchema(z.object({
    id: z.string({
        required_error: "Id Vaksin tidak boleh kosong"
    }),
    nama: z.string({
        required_error: "Nama Vaksin tidak boleh kosong"
    }),
    harga: z.number({
        required_error: "Harga tidak boleh kosong"
    }).min(1, "Harga tidak boleh bernilai 0")
}))

const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
        id: idVaksin,
    }
})

const onSubmit = handleSubmit( async (values) => {
    try {
        await updateVaccines(values.id, values.nama, values.harga);
        toast.success(`Vaksin dengan Id ${values.id} berhasil diperbarui`)
        router.push("/vaksin");
    } catch (error: any) {
        toast.warning(`Vaksin dengan Id ${values.id} gagal diperbarui`);
    }

})
</script>

<template>
    <div class="flex flex-col items-center w-full gap-4">
        <h1 class="font-bold text-xl text-center">Update Vaccine</h1>
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4">

            <FormField v-slot="{ field }" name="id">
                <FormItem>
                    <FormLabel>Id Vaksin</FormLabel>
                    <FormControl>
                        <Input type="text" :placeholder="field.value" v-bind="field" readonly />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="nama">
                <FormItem>
                    <FormLabel>Nama Vaksin</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nama Vaksin" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="harga">
                <FormItem>
                    <FormLabel>Harga Vaksin</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Harga Vaksin" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="w-full flex justify-end">
                <Button type="submit">
                    Create
                </Button>
            </div>
        </form>
    </div>
</template>