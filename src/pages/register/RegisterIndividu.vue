<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { registerIndividu } from '@/services/register.services';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const formSchema = toTypedSchema(z.object({
    email : z.string({
        required_error: "Email tidak boleh kosong"
    }).email("Format Email salah"),
    namaDepan : z.string({
        required_error: "Nama Depan tidak boleh kosong"
    }),
    namaTengah : z.string().optional(),
    namaBelakang : z.string({
        required_error: "Nama Belakang tidak boleh kosong"
    }).nonempty(),
    password: z.string().min(8, "Panjang password minimal 8"),
    nomorTelepon: z.string({
        required_error: "Nomor Telepon tidak boleh kosong"
    }).regex(/^\d+$/, "Nomor Telepon hanya boleh berisi angka")
        .nonempty("Nomor Telepon tidak boleh kosong"),
    alamat: z.string({
        required_error: "Alamat tidak boleh kosong"
    })
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit( async (values) => {
    try {
        await registerIndividu({...values})
        toast.success("Success registering Individu!");
    } catch (error: any) {
        toast.error("Failed to register Individu", {
            description: error.message
        })
    }
})
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full px-4 gap-4">
        <h1 class="text-xl font-bold">Register Klien - Individu</h1>
        <form @submit="onSubmit" class="w-full max-w-md space-y-4">
            <FormField v-slot="{ field, errorMessage }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Email" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="namaDepan">
                <FormItem>
                    <FormLabel>Nama Depan</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nama Depan" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="namaTengah">
                <FormItem>
                    <FormLabel>Nama Tengah</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nama Tengah" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="namaBelakang">
                <FormItem>
                    <FormLabel>Nama Belakang</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nama Belakang" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="nomorTelepon">
                <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nomor Telepon" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="alamat">
                <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                        <Textarea type="text" placeholder="Alamat" v-bind="field"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button type="submit" class="w-full">
                Register
            </Button>
        </form>
    </div>
</template>