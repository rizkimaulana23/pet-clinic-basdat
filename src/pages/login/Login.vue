<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { login } from '@/services/authentication.service';
import { toast } from 'vue-sonner';
import router from '@/routes';


const formSchema = toTypedSchema(z.object({
    email: z.string({
        required_error: "Email tidak boleh kosong"
    }).email("Invalid email address"),
    password: z.string({
        required_error: "Password tidak boleh kosong"
    }).min(8, 'Password minimal 8 karakter')
}))

const form = useForm({
    validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        await login({
            email: values.email,
            password: values.password
        }).then((res) =>  {
            if (res === false) throw new Error();
        })
        toast.success('Login success. Redirecting to dashboard...');
        router.push("/dashboard")
    } catch (error: any) {
        toast.error('Login failed. Check your email and password again.')
    }
})

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full px-4 gap-4">
        <h1 class="text-xl font-bold">Login</h1>
        <form @submit="onSubmit" class="w-full max-w-md space-y-4 flex flex-col">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Email" v-bind="componentField" />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            </FormField>
            
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button type="submit" class="w-full">
                Login
            </Button>
            <div class="w-full text-end">
                Don't have an account yet? <a href="/register" class="underline text-blue-500">Register here</a>.
            </div>
        </form>
    </div>
</template>