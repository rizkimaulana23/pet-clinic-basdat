<script setup lang="ts">
import CreateNewKunjunganButton from '@/components/button/kunjungan/CreateNewKunjunganButton.vue';
import DeleteKunjunganButton from '@/components/button/kunjungan/DeleteKunjunganButton.vue';
import UpdateKunjunganButton from '@/components/button/kunjungan/UpdateKunjunganButton.vue';
import ViewRekamMedisButton from '@/components/button/kunjungan/ViewRekamMedisButton.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { getAllVisits, type VisitsDto } from '@/services/visits.services';
import { onMounted, ref } from 'vue';


const data = ref<VisitsDto[]>();
const fetchData = async () => {
    data.value = await getAllVisits();
}

onMounted(() => {
    fetchData();
})
</script>

<template>
    <div class="space-y-1">
        <h1 class="font-bold text-xl">List Visits</h1>
        <div class="flex flex-col w-full gap-3">
            <div class="text-end">
                <CreateNewKunjunganButton @refresh="fetchData" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center">Id Kunjungan</TableHead>
                        <TableHead class="text-center">Id Klien</TableHead>
                        <TableHead class="text-center">Nama Hewan</TableHead>
                        <TableHead class="text-center">Metode Kunjungan</TableHead>
                        <TableHead class="text-center">Waktu Mulai Penanganan</TableHead>
                        <TableHead class="text-center">Waktu Akhir Penanganan</TableHead>
                        <TableHead class="text-center">Rekam Medis</TableHead>
                        <TableHead class="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(item, index) in data" :key="index">
                        <TableCell class="text-center">{{ item.idKunjungan }}</TableCell>
                        <TableCell class="text-center">{{ item.idKlien }}</TableCell>
                        <TableCell class="text-center">{{ item.namaHewan }}</TableCell>
                        <TableCell class="text-center">{{ item.tipeKunjungan }}</TableCell>
                        <TableCell class="text-center">{{ item.timestampAwal }}</TableCell>
                        <TableCell class="text-center">{{ item.timestampAkhir }}</TableCell>
                        <TableCell class="text-center space-x-1">
                            <ViewRekamMedisButton :data="{
                                beratBadan: item.beratBedan,
                                idKunjungan: item.idKunjungan,
                                suhu: item.suhu,
                                catatanMedis: ''
                            }" />
                        </TableCell>
                        <TableCell class="text-center space-x-1">
                            <UpdateKunjunganButton :data="{
                                idDokter: item.idDokter,
                                idKlien: item.idKlien,
                                idKunjungan: item.idKunjungan,
                                idPerawat: item.idPerawat,
                                namaHewan: item.namaHewan,
                                tipeKunjungan: item.tipeKunjungan,
                                waktuAkhirPenagangan: item.timestampAkhir,
                                waktuMulaiPenanganan: item.timestampAwal
                            }" />
                            <DeleteKunjunganButton :id-kunjungan="item.idKunjungan" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>