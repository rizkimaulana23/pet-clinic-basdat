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
import Select from '@/components/ui/select/Select.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import { getAllAnimalTypes, type AnimalTypesDto } from '@/services/animal-type.services';
import { updateAnimal } from '@/services/animal.services';
import { getCurrentUser } from '@/services/authentication.service';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';
import { z } from 'zod';

const user = getCurrentUser();
const listJenisHewan = ref<AnimalTypesDto[]>();

const props = defineProps<{
  hewan: {
    jenis: string,
    nama: string,
    tanggalLahir: string,
    url: string
  }
}>();

const formSchema = toTypedSchema(z.object({
    pemilik: z.string({
        required_error: "Id tidak boleh kosong"
    }),
    jenis: z.string({
        required_error: "Jenis tidak boleh kosong"
    }).min(1, "Jenis tidak boleh kosong"),
    nama: z.string({
      required_error: "Nama Hewan tidak boleh kosong"
    }),
    tanggalLahir: z.string({
      required_error: "Tanggal Lahir tidak boleh kosong"
    })
    .refine((val) => !isNaN(Date.parse(val)), {
        message: "Format tanggal tidak valid"
    }),
    url: z.string({
      required_error: "URL Foto tidak boleh kosong"
    })
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    pemilik : user?.id,
    jenis: props.hewan.jenis,
    nama: props.hewan.nama,
    tanggalLahir: props.hewan.tanggalLahir,
    url: props.hewan.url
  }
})

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
  isOpen.value = newState;
  if (newState) {
    resetForm({
      values: {
        pemilik : user?.id,
        jenis: props.hewan.jenis,
        nama: props.hewan.nama,
        tanggalLahir: props.hewan.tanggalLahir,
        url: props.hewan.url
      }
    })
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const birthDate = new Date(values.tanggalLahir);
    await updateAnimal(user?.id ?? '', values.jenis, values.nama, birthDate, values.url, props.hewan.nama);
    isOpen.value = false;
    toast.success("Sucessfully updated Hewan.")
  } catch (error: any) {
    toast.error("Failed to update Hewan.", {
      description: error.message
    });
  }
})

const fetchData = async () => {
    const [animalTypes] = await Promise.all([getAllAnimalTypes()]);
    listJenisHewan.value = animalTypes;
}

onMounted( async () => {
  await fetchData();
  console.log(props);
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
      </DialogHeader>
      <div class="overflow-y-auto pr-1 max-h-[calc(80vh-10rem)] ml-[-0.25rem]">
        <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4 mt-3 overflow-y-auto p-1">    
            <FormField v-slot="{ componentField }" name="jenis">
                <FormItem>
                    <FormLabel>Jenis Hewan</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Select Animal Types"></SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem v-for="(item, _) in listJenisHewan" :value="item.id">{{ item.jenis }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="nama">
                <FormItem>
                    <FormLabel>Nama Hewan</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" placeholder="Nama Hewan" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="tanggalLahir">
                <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                        <Input type="date" v-bind="componentField" placeholder="Tanggal Lahir Hewan" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="url">
                <FormItem>
                    <FormLabel>URL Foto</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" placeholder="URL Foto" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </form>
    </div>
      <DialogFooter>
        <Button @click="onSubmit">Update</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>