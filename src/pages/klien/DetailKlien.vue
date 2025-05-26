<script setup lang="ts">
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';

</script>

<template>
    <div class="w-full flex flex-col gap-5">
        <h1 class="text-center font-bold text-xl">Detail Client</h1>
        <div class="grid grid-cols-[1fr_3fr]">
            <div class="space-y-1">
                <h2 class="font-medium">Nomor Identitas</h2>
                <h2 class="font-medium">Nama Perusahaan</h2>
                <h2 class="font-medium">Alamat</h2>
                <h2 class="font-medium">Nomor Telepon</h2>
                <h2 class="font-medium">Email</h2>
            </div>
            <div class="space-y-1">
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
            </div>
        </div>
        <div class="space-y-2">
            <h2 class="font-semibold text-xl">Daftar Hewan Peliharaan</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center w-[10%]">No</TableHead>
                        <TableHead class="text-center">Nama</TableHead>
                        <TableHead class="text-center">Jenis</TableHead>
                        <TableHead class="text-center">Tanggal Lahir</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell class="text-center w-[10%]">1</TableCell>
                        <TableCell class="text-center">Bunny</TableCell>
                        <TableCell class="text-center">Kelinci</TableCell>
                        <TableCell class="text-center">21/07/2023</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>

</template>