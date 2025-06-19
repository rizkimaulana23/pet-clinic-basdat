<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
    <div class="min-hw-full flex flex-col items-center justify-center bg-background p-6">
        <div class="flex flex-col items-center justify-center w-full px-4 gap-4">
            <h1 class="text-xl font-bold">Registrasi Akun</h1>
            <div class="flex gap-10">
                <div class="flex flex-col items-center gap-5">
                    <h2 class="text-lg font-semibold">Pekerja</h2>
                    <div class="flex flex gap-3 items-center">
                        <router-link to="/register/front-desk" class="w-48 h-64">
                            <Button class="w-full h-64 text-lg">Front-Desk Officer</Button>
                        </router-link>
                        <router-link to="/register/dokter" class="w-48 h-64">
                            <Button class="w-full h-64 text-lg">Dokter</Button>
                        </router-link>
                        <router-link to="/register/perawat" class="w-48 h-64">
                            <Button class="w-full h-64 text-lg">Perawat</Button>
                        </router-link>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-5">
                    <h2 class="text-lg font-semibold">Klien</h2>
                    <div class="flex flex gap-3 items-center">
                        <router-link to="/register/individu" class="w-48 h-64">
                            <Button class="w-full h-64 text-lg">Individu</Button>
                        </router-link>
                        <router-link to="/register/perusahaan" class="w-48 h-64">
                            <Button class="w-full h-64 text-lg">Perusahaan</Button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Login Link -->
        <div class="mt-8">
            Already has an account? <a href="/login" class="underline text-blue-500">Login  </a>.            
        </div>
    </div>
</template>