<script setup lang="ts">
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
import { getCurrentUser } from '@/services/authentication.service';
import type { KlienResponseDto, DokterResponseDto, HewanResponseDto, PerawatResponseDto } from '@/services/visits.services';
import { fetchDokter, fetchHewan, fetchKlienAndHewan, fetchPerawat, updateVisits } from '@/services/visits.services';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted, ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { z } from 'zod';

interface Props {
    idKunjungan: string,
    idKlien: string,
    idDokter: string,
    idPerawat: string,
    namaHewan: string,
    tipeKunjungan: string,
    waktuMulaiPenanganan: string,
    waktuAkhirPenagangan: string
}

const props = defineProps<{
    data: Props
}>();

const emits = defineEmits<{
    'refresh': []
}>();

const formSchema = toTypedSchema(z.object({
    kunjungan: z.string({
        required_error: "Id Kunjungan tidak boleh kosong"
    }),
    klien: z.string({
        required_error: "Id Klien tidak boleh kosong."
    }),
    namaHewan: z.string({
        required_error: "Nama Hewan tidak boleh kosong"
    }),
    dokterHewan: z.string({
        required_error: "Dokter Hewan tidak boleh kosong"
    }),
    perawatHewan: z.string({
        required_error: "Perawat Hewan tidak boleh kosong"
    }),
    metodeKunjungan: z.string({
        required_error: "Metode Kunjungan tidak boleh kosong"
    }),
    waktuMulaiPenanganan: z.string({
        required_error: "Waktu Mulai Penanganan tidak boleh kosong"
    }),
    waktuSelesaiPenanganan: z.string().optional()
}))

const { handleSubmit, resetForm, values } = useForm({
    validationSchema: formSchema,
    initialValues: {
        kunjungan: props.data.idKunjungan,
        klien: props.data.idKlien,
        namaHewan: props.data.namaHewan,
        dokterHewan: props.data.idDokter,
        perawatHewan: props.data.idPerawat,
        metodeKunjungan: props.data.tipeKunjungan,
        waktuMulaiPenanganan: props.data.waktuMulaiPenanganan,
        waktuSelesaiPenanganan: props.data.waktuAkhirPenagangan
    }
})

const formatDatetimeLocal = (isoString: string) => {
    if (!isoString) return '';

    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const isOpen = ref(false);

const handleOpenChange = (newState: boolean) => {
    isOpen.value = newState;
    if (newState) {
        resetForm({
            values: {
                kunjungan: props.data.idKunjungan,
                klien: props.data.idKlien,
                namaHewan: props.data.namaHewan,
                dokterHewan: props.data.idDokter,
                perawatHewan: props.data.idPerawat,
                metodeKunjungan: props.data.tipeKunjungan,
                waktuMulaiPenanganan: formatDatetimeLocal(props.data.waktuMulaiPenanganan),
                waktuSelesaiPenanganan: formatDatetimeLocal(props.data.waktuAkhirPenagangan)
            }
        });
    }
}

const idFrontDesk = getCurrentUser()?.id;

const onSubmit = handleSubmit(async (values) => {
    try {
        await updateVisits({
            idKunjungan: values.kunjungan,
            idDokter: values.dokterHewan,
            idFrontDesk: idFrontDesk ?? '',
            idKlien: values.klien,
            idPerawat: values.perawatHewan,
            namaHewan: values.namaHewan,
            timestampAkhir: formatDatetimeLocal(values.waktuSelesaiPenanganan ?? ''),
            timestampAwal: formatDatetimeLocal(values.waktuMulaiPenanganan),
            tipeKunjungan: values.metodeKunjungan
        });
        isOpen.value = false;
        toast.success("Successfully created Visit.", {
            description: `New Visit with Id has been made`
        })
        emits("refresh");
    } catch (error: any) {
        toast.error("Failed to Create New Visits. Try Again.", {
            description: `${error.message}`
        })
    }
})

const listKlien = ref<KlienResponseDto[]>();
const listHewanBasedOnKlien = ref<HewanResponseDto[]>();
const listDokter = ref<DokterResponseDto[]>();
const listPerawat = ref<PerawatResponseDto[]>();

onMounted(async () => {
    listDokter.value = await fetchDokter();
    listPerawat.value = await fetchPerawat();
    listKlien.value = await fetchKlienAndHewan();
    listHewanBasedOnKlien.value = await fetchHewan(values.klien ?? '');
});

watch(
    () => values.klien,
    async (newKlienId) => {
        if (newKlienId) {
            listHewanBasedOnKlien.value = await fetchHewan(newKlienId);
        } else {
            listHewanBasedOnKlien.value = [];
        }
    }
)
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
                <DialogTitle>
                    Create New Visits
                </DialogTitle>
            </DialogHeader>
            <div class="overflow-y-auto pr-1 max-h-[calc(80vh-10rem)] ml-[-0.25rem]">
                <form @submit.prevent="onSubmit" class="w-full max-w-md space-y-4 mt-3 overflow-y-auto p-1">
                    <FormField v-slot="{ componentField }" name="kunjungan">
                        <FormItem>
                            <FormLabel>Kunjungan</FormLabel>
                            <FormControl>
                                <Input v-bind="componentField" type="text" readonly />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="klien">
                        <FormItem>
                            <FormLabel>Klien</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select Klien"></SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem v-for="(item, _) in listKlien" :value="item.noIdentitas">{{ item.email
                                        }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="namaHewan">
                        <FormItem>
                            <FormLabel>Hewan</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select Hewan"></SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem v-for="(item, _) in listHewanBasedOnKlien" :value="item.nama">{{
                                        item.nama }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="dokterHewan">
                        <FormItem>
                            <FormLabel>Dokter</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select Dokter"></SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem v-for="(item, _) in listDokter" :value="item.id">{{ item.email }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="perawatHewan">
                        <FormItem>
                            <FormLabel>Perawat</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select Perawat"></SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem v-for="(item, _) in listPerawat" :value="item.id">{{ item.email }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="metodeKunjungan">
                        <FormItem>
                            <FormLabel>Tipe Kunjungan</FormLabel>
                            <Select v-bind="componentField">
                                <FormControl>
                                    <SelectTrigger class="w-full">
                                        <SelectValue placeholder="Select Tipe Kunjungan"></SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Janji Temu">Janji Temu</SelectItem>
                                    <SelectItem value="Walk In">Walk In</SelectItem>
                                    <SelectItem value="Darurat">Darurat</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="waktuMulaiPenanganan">
                        <FormItem>
                            <FormLabel>Waktu Mulai Penanganan</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" v-bind="componentField"
                                    placeholder="Waktu Mulai Penanganan" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="waktuSelesaiPenanganan">
                        <FormItem>
                            <FormLabel>Waktu Selesai Penanganan</FormLabel>
                            <FormControl>
                                <Input type="datetime-local" v-bind="componentField"
                                    placeholder="Waktu Selesai Penanganan" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>
            </div>
            <DialogFooter>
                <Button @click="onSubmit">Submit</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>