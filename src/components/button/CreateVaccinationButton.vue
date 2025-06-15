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
import FormMessage from '../ui/form/FormMessage.vue';
import { toast } from 'vue-sonner';
import { PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getAllVaccines, type VaccineResponseDto } from '@/services/vaccines.services';
import { type VisitsDto } from '@/services/visits.services';
import { getAllVaccinationEmptyKunjungan } from '@/services/vaccination.services';

const emit = defineEmits<{
  (e: 'create', data: { idKunjungan: string, idVaksin: string }): void
}>();

const formSchema = toTypedSchema(z.object({
  idKunjungan: z.string({
    required_error: "Id Kunjungan tidak boleh kosong"
  }),
  idVaksin: z.string({
    required_error: "Id Vaksin tidak boleh kosong"
  })
}).refine((data) => listVaksin.value?.find(vaksin => vaksin.kode === data.idVaksin)?.stok !== 0, {
  message: "Tidak bisa dilakukan Vaksinasi karena stok dari Vaksin tersebut adalah 0",
  path: ["idVaksin"]
})
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const isOpen = ref(false);

const handleOpenChange = async (newState: boolean) => {
  isOpen.value = newState;

  if (newState) {
    try {
      const [vaccines, visits] = await Promise.all([
        getAllVaccines(),
        getAllVaccinationEmptyKunjungan()
      ])

      listVaksin.value = vaccines;
      listKunjungan.value = visits;
    } catch (error: any) {
      toast.error("Failed to fetch data")
    }
  }
};

const onSubmit = handleSubmit((values) => {
  toast("Vaccination sedang dibuat", {
    description: JSON.stringify(values, null, 2)
  })

  emit('create', {
    idKunjungan: values.idKunjungan,
    idVaksin: values.idVaksin
  })

  isOpen.value = false;
})

const listVaksin = ref<VaccineResponseDto[]>();
const listKunjungan = ref<VisitsDto[]>();

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
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="idKunjungan">
          <FormItem>
            <FormLabel>Kunjungan</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Kunjungan"></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem v-for="(item, index) in listKunjungan" :value="item.idKunjungan" :key="index">{{
                  item.idKunjungan }}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="idVaksin">
          <FormItem>
            <FormLabel>Vaksin</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Vaksin "></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem v-for="(item, index) in listVaksin" :value="item.kode" :key="index">{{ item.nama }} - [{{
                  item.stok }}]</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <DialogFooter>
        <Button type="submit" @click="onSubmit">Create Vaccination</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>