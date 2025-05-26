<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Button from '../ui/button/Button.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { FormField } from '../ui/form';
import FormItem from '../ui/form/FormItem.vue';
import FormControl from '../ui/form/FormControl.vue';
import FormLabel from '../ui/form/FormLabel.vue';
import Input from '../ui/input/Input.vue';
import FormMessage from '../ui/form/FormMessage.vue';
import { toast } from 'vue-sonner';
import { PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'create', data: { idKunjungan: string, idVaksin: string}): void
}>();

const formSchema = toTypedSchema(z.object({
    idKunjungan: z.string({
        required_error: "Id Kunjungan tidak boleh kosong"
    }),
    idVaksin: z.string({
        required_error: "Id Vaksin tidak boleh kosong"
    })
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
  isOpen.value = newState;
};

const onSubmit = handleSubmit((values) => {
    toast("Vaccine sedang dibuat", {
        description: JSON.stringify(values, null, 2)
    })

    emit('create', {
        idKunjungan: values.idKunjungan,
        idVaksin: values.idVaksin
    })

    isOpen.value = false;
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button>
        <PlusIcon />
        Create New Vaccination
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Vaccination</DialogTitle>
        <DialogDescription>
            Untuk membuat Vaksinasi baru, pilih Kunjungan dan Vaksinasi yang diinginkan.
        </DialogDescription>
        <form @submit.prevent="onSubmit" class="space-y-4">
            <FormField v-slot="{ componentField }" name="idKunjungan">
                <FormItem>
                    <FormLabel>Kunjungan</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Kunjungan" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="idVaksin">
                <FormItem>
                    <FormLabel>Vaksin</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Vaksin" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
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