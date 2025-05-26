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
import Button from '../../ui/button/Button.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { FormField } from '../../ui/form';
import FormItem from '../../ui/form/FormItem.vue';
import FormControl from '../../ui/form/FormControl.vue';
import FormLabel from '../../ui/form/FormLabel.vue';
import Input from '../../ui/input/Input.vue';
import FormMessage from '../../ui/form/FormMessage.vue';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

const emit = defineEmits<{
  'update': [kode: string, stok: number]
}>();

const props = defineProps<{
    id: string,
    nama: string,
    stok: number
}>()

const formSchema = toTypedSchema(z.object({
    stok: z.number({
        required_error: "Id Vaksin tidak boleh kosong"
    }).min(1, "Stok harus lebih dari 0")
}))

const isOpen = ref(false);

const handleOpenChange = (newValue: boolean) => {
  isOpen.value = newValue;

  if (newValue) {
    resetForm({
      values: {
        stok: props.stok
      }
    })
  }
}

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    stok: props.stok
  }
})

const onSubmit = handleSubmit((values) => {
    toast("Stok Vaksin berhasil diperbarui", {
        description: JSON.stringify(values, null, 2)
    })
    emit('update', props.id, values.stok);

    isOpen.value = false;
})

</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button variant="secondary">
        Update Stock
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Medicine Stock</DialogTitle>
        <DialogDescription>
            {{ id }} - {{ nama }} 
        </DialogDescription>
        <form @submit.prevent="onSubmit">
            <FormField v-slot="{ field }" name="stok">
                <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Stok" v-bind="field"/>
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