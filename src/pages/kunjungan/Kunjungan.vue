<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';

</script>

<template>
    <div class="space-y-1">
        <h1 class="font-bold text-xl">List Visits</h1>
        <div class="flex flex-col w-full gap-3">
            <div class="text-end">
                <Button>
                    Create New Visits
                </Button>
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
                    <TableRow>
                        <TableCell class="text-center"></TableCell>
                        <TableCell class="text-center"></TableCell>
                        <TableCell class="text-center"></TableCell>
                        <TableCell class="text-center"></TableCell>
                        <TableCell class="text-center"></TableCell>
                        <TableCell class="text-center"></TableCell>
                        <TableCell class="text-center space-x-1">
                            <Button>
                                Lihat Rekam Medis
                            </Button>
                        </TableCell>
                        <TableCell class="text-center space-x-1">
                            <Button>
                                Update
                            </Button>
                            <Button>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>