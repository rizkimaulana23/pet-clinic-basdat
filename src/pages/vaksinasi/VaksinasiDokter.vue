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

</script>

<template>
    <div class="flex flex-col gap-3 w-full">
        <h1 class="font-bold text-xl">List Vaccination</h1>
        <div class="space-y-2">
            <div class="flex justify-end">
                <CreateVaccinationButton />
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
                    <TableRow>
                        <TableCell class="text-center w-[10%]">1</TableCell>
                        <TableCell class="text-center">asdfad</TableCell>
                        <TableCell class="text-center">adsf</TableCell>
                        <TableCell class="text-center">adf</TableCell>
                        <TableCell class="text-center space-x-1">
                            <UpdateVaccinationButton id-kunjungan="KJN001" id-vaksin="VAC001"></UpdateVaccinationButton>
                            <DeleteVaccinationButton id-kunjungan="KJN001" id-vaksin="VAC001"></DeleteVaccinationButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>