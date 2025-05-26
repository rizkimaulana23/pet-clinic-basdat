<!-- <script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
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
import { ref } from 'vue';

const isOpen = ref(false);

const handleOpenChange = (newValue: boolean) => {
    isOpen.value = newValue;
}


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
</template> -->