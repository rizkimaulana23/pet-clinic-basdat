<script setup lang="ts">
import CreateVaccinationButton from '@/components/button/CreateVaccinationButton.vue';
import DeleteVaccinationButton from '@/components/button/DeleteVaccinationButton.vue';
import UpdateVaccinationButton from '@/components/button/UpdateVaccinationButton.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import type { CreateVaccinationDto, UpdateVaccinationDto, VaccinationDto } from '@/services/vaccination.services';
import { createVaccination, deleteVaccination, getAllVaccination, updateVaccination } from '@/services/vaccination.services';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

const listVaccination = ref<VaccinationDto[]>();
const fetchData = async () => {
    const result = await getAllVaccination();
    listVaccination.value = result;
}

onMounted(() => {
    fetchData();
})


const handleCreateVaccination = async (data: CreateVaccinationDto) => {
    try {
        await createVaccination(data);
        fetchData();
    } catch (error: any) {
        toast.error("Failed to Create Vaccination")
    }
}

const handleUpdateVaccination = async (data: UpdateVaccinationDto) => {
    try {
        await updateVaccination(data);
        toast.success("Succesfully updated Vaccination");
        await fetchData();
    } catch (error: any) {
        toast.error("Failed to update Vaccination", {
            description: error.message
        })
    }
}

const handleDeleteVaccination = async (idKunjungan: string) => {
    try {
        await deleteVaccination(idKunjungan);
        fetchData();
        toast.success("Successfully delete Vaccination")
    } catch (error: any) {
        toast.error("Failed to delete Vaccination", {
            description: error.message
        })
    }
}

</script>

<template>
    <div class="flex flex-col gap-3 w-full">
        <h1 class="font-bold text-xl">List Vaccination</h1>
        <div class="space-y-2">
            <div class="flex justify-end">
                <CreateVaccinationButton @create="handleCreateVaccination"/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center w-[10%]">No</TableHead>
                        <TableHead class="text-center">Kunjungan</TableHead>
                        <TableHead class="text-center">Tanggal Kunjungan</TableHead>
                        <TableHead class="text-center">Vaksin</TableHead>
                        <TableHead class="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(item, index) in listVaccination" :key="index">
                        <TableCell class="text-center w-[10%]">{{ index + 1 }}</TableCell>
                        <TableCell class="text-center">{{ item.idKunjungan }}</TableCell>
                        <TableCell class="text-center">{{ item.tanggalKunjungan }}</TableCell>
                        <TableCell class="text-center">{{ item.kodeVaksin }} - {{ item.namaVaksin }}</TableCell>
                        <TableCell class="text-center space-x-1">
                            <UpdateVaccinationButton :id-kunjungan="item.idKunjungan" :id-vaksin="item.kodeVaksin" @update="handleUpdateVaccination"></UpdateVaccinationButton>
                            <DeleteVaccinationButton :id-kunjungan="item.idKunjungan" :id-vaksin="item.kodeVaksin" @delete="handleDeleteVaccination"></DeleteVaccinationButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>