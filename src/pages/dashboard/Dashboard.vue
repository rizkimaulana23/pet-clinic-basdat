<script setup lang="ts">
import DashboardDokter from './DashboardDokter.vue';
import DashboardFrontDesk from './DashboardFrontDesk.vue';
import DashboardKlien from './DashboardKlien.vue';
import DashboardPerawat from './DashboardPerawat.vue';

</script>

<template>
    <div class="flex flex-col gap-5">
        <DashboardKlien />
        <!-- <DashboardFrontDesk />
        <DashboardDokter/>
         <DashboardPerawat /> -->
    </div>
</template>