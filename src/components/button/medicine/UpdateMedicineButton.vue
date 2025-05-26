<script setup lang="ts">
import {
  Dialog,
  DialogContent,
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
  'update': [kode: string, nama: string, harga: number, dosis: string]
}>();

const props = defineProps<{
    kode: string,
    nama: string,
    harga: number,
    dosis: string
}>()

const formSchema = toTypedSchema(z.object({
    kode: z.string({
      required_error: "Kode Obat tidak boleh kosong"
    }),
    nama: z.string({
        required_error: "Nama Obat tidak boleh kosong"
    }),
    harga: z.number({
        required_error: "Harga Satuan Obat tidak boleh kosong"
    }).min(1, "Harga satuan minimal Rp1"),
    dosis: z.string({
        required_error: "Dosis Obat tidak boleh kosong"
    }),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
  isOpen.value = newState;
  if (newState) {
    resetForm({
      values: { ...props }
    })
  }
};

const onSubmit = handleSubmit((values) => {
    toast("Medicine successfully updated", {
        description: JSON.stringify(values, null, 2)
    })

    emit('update', values.kode, values.nama, values.harga, values.dosis);
    isOpen.value = false;
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button>
        Update
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Medicine</DialogTitle>
        <form @submit.prevent="onSubmit" class="space-y-4">

            <FormField v-slot="{ componentField }" name="kode">
                <FormItem>
                    <FormLabel>Kode</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Kode" v-bind="componentField" readonly/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="nama">
                <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Nama" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="harga">
                <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Vaksin" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="dosis">
                <FormItem>
                    <FormLabel>Dosis</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Dosis" v-bind="componentField"/>
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