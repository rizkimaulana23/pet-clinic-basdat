<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';

const formSchema = toTypedSchema(z.object({
    id: z.string({
        required_error: "Id tidak boleh kosong"
    }),
    namaJenis: z.string({
        required_error: "Nama Jenis tidak boleh kosong"
    })
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
    console.log(values);
})
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full px-4 gap-4">
        <h1 class="font-bold text-xl">Tambah Jenis Hewan Baru</h1>
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4">

            <FormField v-slot="{ field }" name="id">
                <FormItem>
                    <FormLabel>Id Jenis Hewan</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="field" disabled/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="namaJenis">
                <FormItem>
                    <FormLabel>Nama Jenis</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <div class="flex w-full gap-1 justify-end">
                <Button variant="outline">
                    Cancel
                </Button>
                <Button>
                    Tambah
                </Button>
            </div>
        </form>
    </div>
</template>