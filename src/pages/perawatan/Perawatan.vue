<script setup lang="ts">
import CreatePerawatanButton from '@/components/button/perawatan/CreatePerawatanButton.vue';
import DeletePerawatanButton from '@/components/button/perawatan/DeletePerawatanButton.vue';
import UpdatePerawatanButton from '@/components/button/perawatan/UpdatePerawatanButton.vue';
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { onMounted } from 'vue';

const fetchData = () => {
    
}

onMounted(() => {

})
</script>

<template>
    <div class="flex flex-col w-full gap-3">
        <h1 class="font-bold text-xl">List Treatments</h1>
        <div class="space-y-2">
            <div class="text-end">
                <CreatePerawatanButton />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center">No</TableHead>
                        <TableHead class="text-center">Kunjungan</TableHead>
                        <TableHead class="text-center">Id Klien</TableHead>
                        <TableHead class="text-center">Nama Hewan</TableHead>
                        <TableHead class="text-center">Perawat Hewan</TableHead>
                        <TableHead class="text-center">Dokter Hewan</TableHead>
                        <TableHead class="text-center">Front-Desk Officer</TableHead>
                        <TableHead class="text-center">Jenis Perawatan</TableHead>
                        <TableHead class="text-center">Catatan Medis</TableHead>
                        <TableHead class="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell class="text-center">1</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center">adsf</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center">asdf</TableCell>
                        <TableCell class="text-center space-x-1">
                            <UpdatePerawatanButton kunjungan="KJN001" jenis-perawatan="TRM001" catatan="Sudah Oke!" />
                            <DeletePerawatanButton kunjungan="KJN001" jenis-perawatan="TRM001"/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>