<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { getBiodataDokter, type JadwalPraktik, type BiodataDokter, type SertifikatKompetensi, getDaftarJadwalPraktik, getDaftarSertifikat } from '@/services/dashboard.services';
import { onMounted, ref } from 'vue';

const biodataDokter = ref<BiodataDokter>();
const jadwalPraktik = ref<JadwalPraktik[]>();
const sertifikatKompetensi = ref<SertifikatKompetensi[]>();

onMounted(() => {
    fetchData();
})

const fetchData = async () => {
    biodataDokter.value = await getBiodataDokter("dokter1@example.com");
    jadwalPraktik.value = await getDaftarJadwalPraktik("dokter1@example.com");
    sertifikatKompetensi.value = await getDaftarSertifikat("dokter1@example.com");
}

</script>

<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl">Profile Dokter</h1>
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
            <p>{{ biodataDokter?.no_pegawai }}</p>
            <p>{{ biodataDokter?.no_izin_praktik }}</p>
            <p>{{ biodataDokter?.email }}</p>
            <p>{{ biodataDokter?.tanggal_mulai_kerja }}</p>
            <p>{{ biodataDokter?.tanggal_akhir_kerja || '-' }}</p>           
            <p>{{ biodataDokter?.alamat }}</p>
            <p>{{ biodataDokter?.nomor_telepon }}</p>
        </div>
    </div>
    <div>
        <div class="font-bold text-xl text-black">Daftar Sertifikat</div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[10%] text-center">No</TableHead>
                    <TableHead class="w-[45%] text-center">Nomor Sertifikat</TableHead>
                    <TableHead class="w-[45%] text-center">Nama Sertifikat</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in sertifikatKompetensi">
                    <TableCell class="w-[10%] text-center">{{ index + 1 }}</TableCell>
                    <TableCell class="w-[45%] text-center">{{ item.no_sertifikat }}</TableCell>
                    <TableCell class="w-[45%] text-center">{{ item.nama_sertifikat }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>

    <div>
        <div class="font-bold text-xl text-black">Daftar Jadwal Praktik</div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[10%] text-center">No</TableHead>
                    <TableHead class="w-[45%] text-center">Hari</TableHead>
                    <TableHead class="w-[45%] text-center">Jam</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in jadwalPraktik">
                    <TableCell class="w-[10%] text-center">{{ index + 1 }}</TableCell>
                    <TableCell class="w-[45%] text-center">{{ item.hari }}</TableCell>
                    <TableCell class="w-[45%] text-center">{{ item.jam }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    
</template>