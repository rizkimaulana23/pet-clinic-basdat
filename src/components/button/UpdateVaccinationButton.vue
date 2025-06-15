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
import FormMessage from '../ui/form/FormMessage.vue';
import { toast } from 'vue-sonner';
import Select from '../ui/select/Select.vue';
import SelectTrigger from '../ui/select/SelectTrigger.vue';
import SelectValue from '../ui/select/SelectValue.vue';
import SelectContent from '../ui/select/SelectContent.vue';
import SelectItem from '../ui/select/SelectItem.vue';
import { computed, onMounted, ref } from 'vue';
import { getAllVaccines, type VaccineResponseDto } from '@/services/vaccines.services';

const props = defineProps<{
  idKunjungan: string,
  idVaksin: string
}>()

const emits = defineEmits<{
  'update': [data: {
    idKunjungan: string,
    idVaksin: string
  }]
}>();

const isOpen = ref(false);

const formSchema = toTypedSchema(z.object({
  idKunjungan: z.string({
    required_error: "Id Kunjungan tidak boleh kosong",
  }),
  idVaksin: z.string({
    required_error: "Id Vaksin tidak boleh kosong"
  })
}))

const initialValues = computed(() => ({
  idKunjungan: props.idKunjungan,
  idVaksin: props.idVaksin
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues.value
})

onMounted(async () => {
  try {
    listVaksin.value = await getAllVaccines();
  } catch (error) {
    console.error("Failed to prefetch vaccines");
  }
});

const fetchVaccines = async () => {
  try {
    listVaksin.value = await getAllVaccines();
  } catch (error) {
    toast.error("Failed to fetch data");
  }
};

const onDialogOpenChange = async (open: any) => {
  isOpen.value = open;
  if (open) {
    resetForm({
      values: {
        idKunjungan: props.idKunjungan,
        idVaksin: props.idVaksin
      }
    });

    if (!listVaksin.value) {
      fetchVaccines();
    }
  }
};

const onSubmit = handleSubmit((values) => {
  emits("update", {
    idKunjungan: values.idKunjungan,
    idVaksin: values.idVaksin
  })
  isOpen.value = false;
})

const listVaksin = ref<VaccineResponseDto[]>();
</script>

<template>
  <Dialog :open="isOpen" @update:open="onDialogOpenChange">
    <DialogTrigger as-child>
      <Button variant="secondary">
        Update
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-2">Update Vaccination</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="idKunjungan">
          <FormItem>
            <FormLabel>Kunjungan</FormLabel>
            <Select v-bind="componentField" disabled>
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select Kunjungan"></SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem :value="props.idKunjungan">{{ props.idKunjungan }}</SelectItem>
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
        <Button type="submit" @click="onSubmit">Update Stock</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>