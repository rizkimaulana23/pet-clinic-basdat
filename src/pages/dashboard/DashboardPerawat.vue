<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { getBiodataPerawat, getDaftarSertifikat, type SertifikatKompetensi, type BiodataPerawat } from '@/services/dashboard.services';
import { onMounted, ref } from 'vue';

const biodataPerawat = ref<BiodataPerawat>();
const sertifikatKompetensi = ref<SertifikatKompetensi[]>();

onMounted(() => {
    fetchData();
})

const fetchData = async () => {
    biodataPerawat.value = await getBiodataPerawat("perawat1@example.com");
    sertifikatKompetensi.value = await getDaftarSertifikat("perawat1@example.com");
    console.log(sertifikatKompetensi.value);
}

</script>

<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl">Profile Perawat</h1>
        <div class="flex gap-5">
            <Button variant="outline">Update Password</Button>
            <Button variant="default">Update Account</Button>
        </div>
    </div>
    <div class="grid grid-cols-[1fr_3fr]">
        <div class="space-y-1">
            <h2 class="font-medium">Nomor Identitas</h2>
            <h2 class="font-medium">Nomor Izin Praktek</h2>
            <h2 class="font-medium">Email</h2>
            <h2 class="font-medium">Tanggal Diterima</h2>
            <h2 class="font-medium">Tanggal Akhir Kerja</h2>
            <h2 class="font-medium">Alamat</h2>
            <h2 class="font-medium">Nomor Telepon</h2>
        </div>
        <div class="space-y-1">
            <p>{{ biodataPerawat?.no_pegawai }}</p>
            <p>{{ biodataPerawat?.no_izin_praktik }}</p>
            <p>{{ biodataPerawat?.email }}</p>
            <p>{{ biodataPerawat?.tanggal_mulai_kerja }}</p>
            <p>{{ biodataPerawat?.tanggal_akhir_kerja || '-' }}</p>
            <p>{{ biodataPerawat?.alamat }}</p>
            <p>{{ biodataPerawat?.nomor_telepon }}</p>
        </div>
    </div>
    <div>
        <div class="font-bold text-xl text-black">Daftar Sertifikat</div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[10%]">No</TableHead>
                    <TableHead class="w-[45%]">Nomor Sertifikat</TableHead>
                    <TableHead class="w-[45%]">Nama Sertifikat</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow  v-for="(item, index) in sertifikatKompetensi" :key="item.no_sertifikat">
                    <TableCell class="w-[10%]">{{ index + 1 }}</TableCell>
                    <TableCell class="w-[45%]">{{ item.no_sertifikat }}</TableCell>
                    <TableCell class="w-[45%]">{{ item.nama_sertifikat }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>