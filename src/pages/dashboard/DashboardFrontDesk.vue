<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { getBiodataFrontDesk, type BiodataFrontDesk } from '@/services/dashboard.services';
import { onMounted, ref } from 'vue';

const biodataFrontDesk = ref<BiodataFrontDesk>();

onMounted(() => {
    fetchData();
})

const fetchData = async () => {
    biodataFrontDesk.value = await getBiodataFrontDesk("frontdesk1@example.com");
}

</script>

<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl">Profile Front-Desk Officer</h1>
        <div class="flex gap-5">
            <Button variant="outline">Update Password</Button>
            <Button variant="default">Update Account</Button>
        </div>
    </div>
    <div class="grid grid-cols-[1fr_3fr]">
        <div class="space-y-1">
            <h2 class="font-medium">Nomor Identitas</h2>
            <h2 class="font-medium">Email</h2>
            <h2 class="font-medium">Tanggal Diterima</h2>
            <h2 class="font-medium">Tanggal Akhir Kerja</h2>
            <h2 class="font-medium">Alamat</h2>
            <h2 class="font-medium">Nomor Telepon</h2>
        </div>
        <div class="space-y-1">
            <p>{{ biodataFrontDesk?.no_pegawai }}</p>
            <p>{{ biodataFrontDesk?.email }}</p>
            <p>{{ biodataFrontDesk?.tanggal_mulai_kerja }}</p>
            <p>{{ biodataFrontDesk?.tanggal_akhir_kerja || '-' }}</p>
            <p>{{ biodataFrontDesk?.alamat }}</p>
            <p>{{ biodataFrontDesk?.nomor_telepon }}</p>
        </div>
    </div>
</template>