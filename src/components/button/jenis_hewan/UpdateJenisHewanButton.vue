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
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';

const props = defineProps<{
  id: string,
  namaJenis: string
}>();

const emit = defineEmits<{
    'update': [ id: string, namaJenis: string ]
}>();

const formSchema = toTypedSchema(z.object({
    id: z.string({
        required_error: "Id tidak boleh kosong"
    }),
    namaJenis: z.string({
        required_error: "Nama Jenis tidak boleh kosong"
    }).min(1, "Nama Jenis tidak boleh kosong")
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    id: props.id,
    namaJenis: props.namaJenis
  }
})

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
  isOpen.value = newState;
  if (newState) {
    resetForm({
      values: {
        id: props.id,
        namaJenis: props.namaJenis
      }
    })
  }
};

const onSubmit = handleSubmit((values) => {
  emit('update', 
        values.id,
        values.namaJenis,
    )
    
  isOpen.value = false;
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button variant="secondary">
        Update
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Animal Types</DialogTitle>
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4 mt-3">

            <FormField v-slot="{ componentField }" name="id">
                <FormItem>
                    <FormLabel>Id Jenis Hewan</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" disabled/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

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
        <Button @click="onSubmit">Update</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>