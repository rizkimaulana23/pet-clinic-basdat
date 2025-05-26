<script setup lang="ts">
import DeleteVaccineButton from '@/components/button/DeleteVaccineButton.vue';
import UpdateStockVaccineButton from '@/components/button/UpdateStockVaccineButton.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { getAllVaccines, searchVaccines, type VaccineResponseDto } from '@/services/vaccines.services';
import { PlusIcon, SearchIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';


const data = ref<VaccineResponseDto[]>();
const search = ref("");

onMounted(async () => {
    fetchData();
})

const fetchData = async () => {
    data.value = await getAllVaccines();
}

const searchData = async () => {
    data.value = await searchVaccines(search.value);
}
</script>

<template>
    <div class="flex flex-col w-full gap-4">
        <h1 class="font-bold text-xl">List Vaccines</h1>
        <div class="flex justify-between">
            <div class="flex gap-1">
                <form @submit.prevent="searchData">
                    <Input placeholder="Search Vaccines" class="min-w-xs" v-model="search"/>
                </form>
                <Button @click="searchData">
                    <SearchIcon />
                </Button>
            </div>
            <router-link to="/vaksin/create">
                <Button>
                    <PlusIcon />
                    Buat Vaksin Baru
                </Button>
            </router-link>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="text-center">No</TableHead>
                    <TableHead class="text-center">Id Vaksin</TableHead>
                    <TableHead class="text-center">Nama Vaksin</TableHead>
                    <TableHead class="text-center">Harga</TableHead>
                    <TableHead class="text-center">Stok</TableHead>
                    <TableHead class="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in data" :key="item.kode">
                    <TableCell class="text-center">{{  index + 1 }}</TableCell>
                    <TableCell class="text-center">{{ item.kode }}</TableCell>
                    <TableCell class="text-center">{{ item.nama }}</TableCell>
                    <TableCell class="text-center">{{ item.harga }}</TableCell>
                    <TableCell class="text-center">{{ item.stok }}</TableCell>
                    <TableCell class="flex gap-1 justify-center">
                        <UpdateStockVaccineButton :nama="item.nama" :id="item.kode" @update="fetchData"/>
                        <RouterLink :to="`/vaksin/${item.kode}/update`">
                            <Button>Update</Button>
                        </RouterLink>
                        <DeleteVaccineButton :nama-vaksin="item.nama" :kode-vaksin="item.kode" @fetch="fetchData"/>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>