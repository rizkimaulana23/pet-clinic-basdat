<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import { changePassword } from '@/services/dashboard.services';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const formSchema = toTypedSchema(z.object({
    passwordLama: z.string({
        required_error: 'Password lama tidak boleh kosong'
    }).min(8, "Panjang password minimal 8 karakter"),
    passwordBaru: z.string({
        required_error: "Password baru tidak boleh kosong"
    }).min(8, "Panjang password minimal 8 karakter"),
    passwordBaruKonfirmasi: z.string({
        required_error: "Konfirmasi password baru tidak boleh kosong"
    }).min(8, "Panjang password minimal 8 karakter")
}).refine((data) => data.passwordBaru === data.passwordBaruKonfirmasi, {
    message: "Password baru dan konfirmasi password baru harus sama",
    path: ["passwordBaruKonfirmasi"]
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
}) 

const onSubmit = handleSubmit(async (values) => {
    try {
        await changePassword("john.doe@example.com", values.passwordLama, values.passwordBaru);
        toast.success("Successfully changed password for [email]!");
    } catch (error: any) {
        toast.error("Failed when changing the password for [email].", {
            description: error.message
        });
    }
})

const isOpen = ref(false);

const handleOpenChange = (newValue: boolean) => {
    isOpen.value = newValue;
}
</script>

<template>

    <Dialog :open="isOpen" @update:open="handleOpenChange">
        <DialogTrigger as-child>
            <Button variant="secondary">
                Update Password
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Password</DialogTitle>
                <form @submit="onSubmit" class="w-full max-w-md space-y-6">
                    <FormField v-slot="{ field, errorMessage }" name="passwordLama">
                        <FormItem>
                            <FormLabel class="flex gap-1">Password Lama<span class="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password Lama" v-bind="field" />
                            </FormControl>
                            <FormMessage>{{ errorMessage }}</FormMessage>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ field, errorMessage }" name="passwordBaru">
                        <FormItem>
                            <FormLabel class="flex gap-1">Password Baru<span class="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password Baru" v-bind="field" />
                            </FormControl>
                            <FormMessage>{{ errorMessage }}</FormMessage>
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ field, errorMessage }" name="passwordBaruKonfirmasi">
                        <FormItem>
                            <FormLabel class="flex gap-1">Konfirmasi Password Baru<span class="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Konfirmasi Password Baru" v-bind="field" />
                            </FormControl>
                            <FormMessage>{{ errorMessage }}</FormMessage>
                        </FormItem>
                    </FormField>
                </form>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit" @click="onSubmit">Update Stock</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>