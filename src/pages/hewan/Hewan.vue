<script setup lang="ts">
import HewanKlien from './HewanKlien.vue';
import HewanFrontDesk from './HewanFrontDesk.vue';
import CreateHewanFrontDesk from './CreateHewanFrontDesk.vue';
import CreateHewanFrontDeskButton from '@/components/button/hewan/CreateHewanFrontDeskButton.vue';
import { ref } from 'vue';
import CreateHewanKlienButton from '@/components/button/hewan/CreateHewanKlienButton.vue';

const hewanFrontDeskRef = ref<InstanceType<typeof HewanFrontDesk>>();
const hewanKlienRef = ref<InstanceType<typeof HewanKlien>>();

const handlePetCreatedFrontDesk = () => {
  hewanFrontDeskRef.value?.fetchData();
};

const handlePetCreatedKlien = () => {
    hewanKlienRef.value?.fetchData();
}
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div class="w-full">
            <h1 class="font-bold text-xl">List Hewan Peliharaan</h1>
        </div>
        <div class="flex justify-end">
            <CreateHewanKlienButton @pet-created="handlePetCreatedKlien"/>
            <!-- <CreateHewanFrontDeskButton @pet-created="handlePetCreatedFrontDesk"/> -->
        </div>
        <HewanKlien ref="hewanKlienRef"/>
        <!-- <HewanFrontDesk ref="hewanFrontDeskRef" /> -->
    </div>
</template>