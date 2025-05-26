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
import Select from '../ui/select/Select.vue';
import SelectTrigger from '../ui/select/SelectTrigger.vue';
import SelectValue from '../ui/select/SelectValue.vue';
import SelectContent from '../ui/select/SelectContent.vue';
import SelectItem from '../ui/select/SelectItem.vue';
import { computed } from 'vue';

const props = defineProps<{
    idKunjungan: string,
    idVaksin: string
}>()

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

const onDialogOpenChange = (open: any) => {
  if (open) {
    resetForm({
      values: {
        idKunjungan: props.idKunjungan,
        idVaksin: props.idVaksin
      }
    });
  }
};

const onSubmit = handleSubmit((values) => {
    toast("Vaccination berhasil diperbarui", {
        description: JSON.stringify(values, null, 2)
    })
})
</script>

<template>
  <Dialog  @update:open="onDialogOpenChange">
    <DialogTrigger as-child>
      <Button variant="secondary">
        Update
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-2">Update Vaccination</DialogTitle>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
            <FormField v-slot="{ componentField }" name="idKunjungan" :key="`kunjungan-${props.idKunjungan}`">
                <FormItem>
                    <FormLabel>Kunjungan</FormLabel>
                    <FormControl>
                        <Input type="string" placeholder="Id Kunjungan" v-bind="componentField" disabled/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="idVaksin" :key="`vaksin-${props.idVaksin}`">
                <FormItem>
                    <FormLabel>Vaksin</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select Vaccine" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="VAC001">Vaksin 1</SelectItem>
                            <SelectItem value="VAC002">Vaksin 2</SelectItem>
                            <SelectItem value="VAC003">Vaksin 3</SelectItem>
                        </SelectContent>
                    </Select>
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