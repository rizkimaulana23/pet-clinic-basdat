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
import FormMessage from '../../ui/form/FormMessage.vue';
import { toast } from 'vue-sonner';
import { PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import Select from '@/components/ui/select/Select.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';

const formSchema = toTypedSchema(z.object({
    kunjungan: z.string({
        required_error: "Kunjungan tidak boleh kosong"
    }),
    jenisPerawatan: z.string({
        required_error: "Jenis Perawatan tidak boleh kosong"
    }),
    catatan: z.string().optional(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
  isOpen.value = newState;
};

const onSubmit = handleSubmit((values) => {
    toast("Treatments successfully made", {
        description: JSON.stringify(values, null, 2)
    })

    isOpen.value = false;
})
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button>
        <PlusIcon />
        Create New Treatments
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Treatment</DialogTitle>
        <form @submit.prevent="onSubmit" class="space-y-4 mt-3">
            <FormField v-slot="{ componentField }" name="kunjungan">
                <FormItem >
                    <FormLabel>Kunjungan</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select Kunjungan"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="KJN001">KJN001</SelectItem>
                            <SelectItem value="KJN002">KJN002</SelectItem>
                            <SelectItem value="KJN003">KJN003</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="jenisPerawatan">
                <FormItem>
                    <FormLabel>Jenis Perawatan</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select Jenis Perawatan"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="TRM001">TRM001 - Dental Care</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="catatan">
                <FormItem>
                    <FormLabel>Catatan</FormLabel>
                    <FormControl>
                        <Textarea type="text" placeholder="Catatan" v-bind="componentField">
                        </Textarea>
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