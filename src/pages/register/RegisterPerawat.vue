<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import { registerPerawat } from '@/services/register.services';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const kompetensiItems = ref([
  { nomorSertifikat: '', namaSertifikat: '' }
]);
const tambahSertifikat = () => {
  kompetensiItems.value.push({ nomorSertifikat: '', namaSertifikat: '' });
};

const formSchema = toTypedSchema(z.object({
    noIzinPraktik: z.string({
        required_error: "Nomor Izin Praktik tidak boleh kosong"
    }),
    email: z.string({
        required_error: "Email tidak boleh kosong"
    }).email("Format Email salah"),
    password: z.string({
        required_error: "Password tidak boleh kosong"
    }).min(8, "Panjang password minimal 8"),
    nomorTelepon: z.string({
        required_error: "Nomor Telepon tidak boleh kosong"
    })
    .regex(/^\d+$/, "Nomor Telepon hanya boleh berisi angka"),
    tanggalDiterima: z.string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Format tanggal tidak valid"
        })
        .transform((val) => new Date(val)),
    alamat: z.string({
        required_error: "Alamat tidak boleh kosong"
    }),
    kompetensi: z.array(
        z.object({
            nomorSertifikat: z.string({ required_error: "Nomor sertifikat tidak boleh kosong"}),
            namaSertifikat: z.string({ required_error: "Nama sertifikat tidak boleh kosong"})
        })
    ).min(1, "Setidaknya harus ada 1 Sertifikat Kompetensi"),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit( async (values) => {
    try {
        await registerPerawat({...values})
        toast.success("Success registering Perawat!");
    } catch (error: any) {
        toast.error("Failed to register Perawat", {
            description: error.message
        })
    }
})
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full px-4 gap-4">
        <h1 class="text-xl font-bold">Registration</h1>
        <h2 class="text-lg">Perawat Hewan</h2>
        
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-6">
            <div class="border-b pb-2 mb-4">
                <h3 class="font-medium">Informasi Umum</h3>
            </div>
            
            <FormField v-slot="{ field, errorMessage }" name="noIzinPraktik">
                <FormItem>
                    <FormLabel class="flex gap-1">Nomor Izin Praktik <span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nomor Izin Praktik" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <FormField v-slot="{ field, errorMessage }" name="email">
                <FormItem>
                    <FormLabel class="flex gap-1">Email <span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Email" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <FormField v-slot="{ field, errorMessage }" name="password">
                <FormItem>
                    <FormLabel class="flex gap-1">Password <span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <FormField v-slot="{ field, errorMessage }" name="nomorTelepon">
                <FormItem>
                    <FormLabel class="flex gap-1">Nomor Telepon <span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Input type="tel" placeholder="Nomor Telepon" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <!-- Tanggal Diterima -->
            <FormField v-slot="{ field, errorMessage }" name="tanggalDiterima">
                <FormItem>
                    <FormLabel class="flex gap-1">Tanggal Diterima <span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Input type="date" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <FormField v-slot="{ field, errorMessage }" name="alamat">
                <FormItem>
                    <FormLabel class="flex gap-1">Alamat <span class="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Textarea placeholder="Alamat" v-bind="field"/>
                    </FormControl>
                    <FormMessage>{{ errorMessage }}</FormMessage>
                </FormItem>
            </FormField>

            <div class="border-b pb-2 mb-4 flex justify-between items-center">
                <h3 class="font-medium">Kompetensi</h3>
                <Button type="button" variant="outline" size="sm" class="flex items-center gap-1" @click="tambahSertifikat">
                    <span class="text-xl">+</span> Tambah Sertifikat
                </Button>
            </div>
            
            <div v-for="(_, index) in kompetensiItems" :key="`sertifikat-${index}`" class="space-y-4">
                <FormField 
                    v-slot="{ field, errorMessage }" 
                    :name="`kompetensi[${index}].nomorSertifikat`"
                >
                    <FormItem>
                        <FormLabel class="flex gap-1">Nomor Sertifikat <span class="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input 
                                type="text" 
                                placeholder="Nomor Sertifikat" 
                                v-model="kompetensiItems[index].nomorSertifikat"
                                @input="field.onChange"
                                @blur="field.onBlur"
                            />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>

                <FormField 
                    v-slot="{ field, errorMessage }" 
                    :name="`kompetensi[${index}].namaSertifikat`"
                >
                    <FormItem>
                        <FormLabel class="flex gap-1">Nama Sertifikat <span class="text-red-500">*</span></FormLabel>
                        <FormControl>
                            <Input 
                                type="text" 
                                placeholder="Nama Sertifikat" 
                                v-model="kompetensiItems[index].namaSertifikat"
                                @input="field.onChange"
                                @blur="field.onBlur"
                            />
                        </FormControl>
                        <FormMessage>{{ errorMessage }}</FormMessage>
                    </FormItem>
                </FormField>
            </div>

            <Button type="submit" class="w-full">
                Register
            </Button>
        </form>
    </div>
</template>