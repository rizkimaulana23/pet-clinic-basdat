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
import { PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const emit = defineEmits<{
  'create': [nama: string, harga: number, stok: number, dosis: string]
}>();

const formSchema = toTypedSchema(z.object({
    nama: z.string({
        required_error: "Nama Obat tidak boleh kosong"
    }),
    harga: z.number({
        required_error: "Harga Satuan Obat tidak boleh kosong"
    }).min(1, "Harga satuan minimal Rp1"),
    dosis: z.string({
        required_error: "Dosis Obat tidak boleh kosong"
    }),
    stokAwal: z.number({
        required_error: "Stok Awal obat tidak boleh kosong"
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
    toast("Medicine successfully made", {
        description: JSON.stringify(values, null, 2)
    })

    emit('create', values.nama, values.harga, values.stokAwal, values.dosis)

    isOpen.value = false;
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button>
        <PlusIcon />
        Add New Medicine
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Medicine</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="space-y-4">
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

            <FormField v-slot="{ componentField }" name="stokAwal">
                <FormItem>
                    <FormLabel>Stok Awal</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="Stok Awal" v-bind="componentField"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </form>
      <DialogFooter>
        <Button type="submit" @click="onSubmit">Create Medicine</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>