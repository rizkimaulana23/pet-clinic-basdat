<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { getBiodataKlien, type BiodataKlien } from '@/services/dashboard.services';
import { onMounted, ref } from 'vue';
import UpdatePasswordButton from './UpdatePasswordButton.vue';

const biodataKlien = ref<BiodataKlien>();

onMounted(() => {
    fetchData();
})

const fetchData = async () => {
    biodataKlien.value = await getBiodataKlien("john.doe@example.com");
}
</script>

<template>
    <div class="flex justify-between">
        <h1 class="font-bold text-xl">Profile Klien</h1>
        <div class="flex gap-5">
            <UpdatePasswordButton />
            <Button variant="default">Update Account</Button>
        </div>
    </div>
    <div class="grid grid-cols-[1fr_3fr]">
        <div class="space-y-1">
            <h2 class="font-medium">Nomor Identitas</h2>
            <h2 class="font-medium">Email</h2>
            <h2 class="font-medium">Nama</h2>
            <h2 class="font-medium">Tanggal Pendaftaran</h2>
            <h2 class="font-medium">Alamat</h2>
            <h2 class="font-medium">Nomor Telepon</h2>
        </div>
        <div class="space-y-1">
            <p>{{ biodataKlien?.no_identitas }}</p>
            <p>{{ biodataKlien?.email }}</p>
            <p>{{ biodataKlien?.full_name }}</p>
            <p>{{ biodataKlien?.tanggal_registrasi }}</p>
            <p>{{ biodataKlien?.alamat }}</p>
            <p>{{ biodataKlien?.nomor_telepon }}</p>
        </div>
    </div>
</template>