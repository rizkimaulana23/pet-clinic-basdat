<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import { addVaccines, countAllVaccines } from '@/services/vaccines.services';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const router = useRouter();

const formSchema = toTypedSchema(z.object({
    nama: z.string({
        required_error: "Nama Vaksin tidak boleh kosong"
    }),
    harga: z.number({
        required_error: "Harga tidak boleh kosong"
    }).min(1, "Harga tidak boleh bernilai 0"),
    stokAwal: z.number({
        required_error: "Stok Awal tidak boleh kosong"
    })
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
    try {
        const jumlahVaksin = await countAllVaccines();

        const nextNumber = jumlahVaksin + 1;
        const paddedNumber = nextNumber.toString().padStart(3, '0');
        const vaccineCode = `VAC${paddedNumber}`;

        await addVaccines({
            kode: vaccineCode,
            nama: values.nama,
            harga: values.harga,
            stok: values.stokAwal
        });
        
        toast.success("Vaksin berhasil dibuat", {
            description: "Vaksin baru telah ditambahkan ke database"
        });

        router.push("/vaksin")
    } catch (error: any) {
        toast.error("Gagal membuat vaksin", {
            description: error.message
        });
    }
});
</script>

<template>
    <div class="flex flex-col items-center w-full gap-4">
        <h1 class="font-bold text-xl text-center">Create New Vaccine</h1>
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4">
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

            <FormField v-slot="{ field }" name="stokAwal">
                <FormItem>
                    <FormLabel>Stok Awal</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Stok Awal" v-bind="field"/>
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