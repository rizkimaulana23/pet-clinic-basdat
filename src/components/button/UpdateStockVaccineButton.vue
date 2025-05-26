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
import { updateStockVaccines } from '@/services/vaccines.services';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'update'): void
}>();

const props = defineProps<{
    id: string,
    nama: string
}>()

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
  isOpen.value = newState;
};

const formSchema = toTypedSchema(z.object({
    stok: z.number({
        required_error: "Id Vaksin tidak boleh kosong"
    }).min(1, "Stok harus lebih dari 0")
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const handleUpdate = handleSubmit( async (values) => {
  try {
    await updateStockVaccines(props.id, values.stok);
    toast.success(`Stok untuk Vaksin ${props.id} berhasil diperbarui menjadi ${values.stok}`, {
        description: JSON.stringify(values, null, 2)
    })
    isOpen.value = false;
    emit('update');
  } catch (error: any) {
    toast.warning(`Stok untuk Vaksin ${props.id} gagal diperbarui`)
  }
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
        <DialogTitle>Update Stock Vaccine</DialogTitle>
        <DialogDescription>
            {{ id }} - {{ nama }} 
        </DialogDescription>
        <form @submit.prevent="handleUpdate">
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
        <Button type="submit" @click="handleUpdate">Update Stock</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>