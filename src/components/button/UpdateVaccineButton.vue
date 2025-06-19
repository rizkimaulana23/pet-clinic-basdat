<script setup lang="ts">
import {
  Dialog,
  DialogContent,
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
import { ref } from 'vue';
import { getVaccine, updateVaccines } from '@/services/vaccines.services';

const emit = defineEmits<{
  'update': []
}>();

const props = defineProps<{
  kode: string,
  nama: string,
  harga: number
}>()

const formSchema = toTypedSchema(z.object({
  kode: z.string({
    required_error: "Kode Vaksin tidak boleh kosong"
  }),
  nama: z.string({
    required_error: "Nama Vaksin tidak boleh kosong"
  }),
  harga: z.number({
    required_error: "Harga tidak boleh kosong"
  }).min(1, "Harga tidak boleh bernilai 0")
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const isOpen = ref(false);

const handleOpenChange = async (newState: boolean) => {
  isOpen.value = newState;
  if (newState) {
    try {
      // Fetch the latest vaccine data when dialog opens
      const vaccineData = await getVaccine(props.kode);
      resetForm({
        values: {
          kode: props.kode,
          nama: vaccineData.nama,
          harga: vaccineData.harga
        }
      });
    } catch (error) {
      // Fallback to props if fetch fails
      resetForm({
        values: {
          kode: props.kode,
          nama: props.nama,
          harga: props.harga
        }
      });
    }
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    await updateVaccines(values.kode, values.nama, values.harga);
    toast.success(`Vaksin dengan Id ${values.kode} berhasil diperbarui`);
    emit('update');
    isOpen.value = false;
  } catch (error: any) {
    toast.error(`Vaksin dengan Id ${values.kode} gagal diperbarui`);
  }
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
        <DialogTitle>Update Vaccine</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="space-y-4">

        <FormField v-slot="{ componentField }" name="kode">
          <FormItem>
            <FormLabel>Kode Vaksin</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Kode" v-bind="componentField" readonly />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="nama">
          <FormItem>
            <FormLabel>Nama Vaksin</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Nama Vaksin" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="harga">
          <FormItem>
            <FormLabel>Harga Vaksin</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Harga Vaksin" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button type="submit" @click="onSubmit">Update Vaccine</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template> 