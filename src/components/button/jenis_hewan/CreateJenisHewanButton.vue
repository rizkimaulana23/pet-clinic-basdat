<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormField } from '@/components/ui/form';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { PlusIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const emit = defineEmits<{
    'create': [namaJenis: string]
}>();

const formSchema = toTypedSchema(z.object({
    namaJenis: z.string({
        required_error: "Nama Jenis tidak boleh kosong"
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
    toast("Jenis Hewan baru sedang ditambahkan", {
        description: JSON.stringify(values, null, 2)
    })

    emit('create', values.namaJenis)

    isOpen.value = false;
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button>
        <PlusIcon />
        Add New Animal Types
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Animal Types</DialogTitle>
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4 mt-3">
            <FormField v-slot="{ componentField }" name="namaJenis">
                <FormItem>
                    <FormLabel>Nama Jenis</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </form>

      </DialogHeader>
      <DialogFooter>
        <Button type="submit" @click="onSubmit">Add</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>