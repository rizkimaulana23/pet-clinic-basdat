<script setup lang="ts">
import CreateNewMedicineButton from '@/components/button/medicine/CreateNewMedicineButton.vue';
import DeleteMedicineButton from '@/components/button/medicine/DeleteMedicineButton.vue';
import UpdateMedicineButton from '@/components/button/medicine/UpdateMedicineButton.vue';
import UpdateStockMedicineButton from '@/components/button/medicine/UpdateStockMedicineButton.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { addMedicine, deleteMedicine, getAllMedicines, searchMedicine, updateMedicine, updateStockMedicine, type MedicineResponseDto } from '@/services/obat.services';
import { SearchIcon } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

const data = ref<MedicineResponseDto[]>();

const search = ref("");

const handleCreate = async (nama: string, harga: number, stok: number, dosis: string) => {
    try {
        await addMedicine(nama, harga, dosis, stok);
        toast.success('Berhasil membuat Obat baru!');
        await fetchData();
    } catch (error: any) {
        toast.error('Gagal membuat obat Baru', {
            description: error.message
        })
    }
}

const handleUpdateStock = async (kode: string, stok: number) => {
    try {
        await updateStockMedicine(kode, stok);
        toast.success(`Berhasil memperbarui stok untuk Obat ${kode} menjadi ${stok}!`);
        await fetchData();
    } catch (error: any) {
        toast.error(`Gagal memperbarui stok untuk Obat ${kode}`, {
            description: error.message
        })
    }
}

const handleUpdate = async (kode: string, nama: string, harga: number, dosis: string) => {
    try {
        await updateMedicine(kode, nama, harga, dosis);
        toast.success(`Berhasil memperbarui data untuk Obat ${kode}!`);
        await fetchData();
    } catch (error: any) {
        toast.error(`Gagal memperbarui data untuk Obat ${kode}`, {
            description: error.message
        })
    }
}

const handleDelete = async (kode: string) => {
    try {
        await deleteMedicine(kode);
        toast.success(`Berhasil menghapus Obat ${kode}!`);
        await fetchData();
    } catch (error: any) {
        toast.error(`Gagal menghapus Obat ${kode}`, {
            description: error.message
        })
    }
}

const handleSearch = async () => {
    try {
        data.value = await searchMedicine(search.value);
        toast.success(`Berhasil mencari Obat dengan untuk '${search.value}'!`);
    } catch (error: any) {
        toast.error(`Gagal mencari Obat dengan untuk '${search.value}'`, {
            description: error.message
        })
    }
}

onMounted(async () => {
    await fetchData();
})


const fetchData = async () => {
    data.value = await getAllMedicines();
}
</script>

<template>
    <div class="flex flex-col w-full gap-3">
        <h1 class="font-bold text-xl">List Medicines</h1>
        <div class="space-y-3">
            <div class="flex w-full justify-between">
                    <form @submit.prevent="handleSearch" class="flex gap-1">
                        <Input placeholder="Search Medicine Name" v-model="search"/>
                        <Button type="submit">
                            <SearchIcon />
                        </Button>
                    </form>
                    <CreateNewMedicineButton @create="handleCreate"/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center w-[10%]">No</TableHead>
                        <TableHead class="text-center">Kode Obat</TableHead>
                        <TableHead class="text-center">Nama Obat</TableHead>
                        <TableHead class="text-center">Harga Satuan</TableHead>
                        <TableHead class="text-center">Stok</TableHead>
                        <TableHead class="text-center">Dosis</TableHead>
                        <TableHead class="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(item, index) in data" :key="item.kode">
                        <TableCell class="text-center w-[10%]">{{ index + 1 }}</TableCell>
                        <TableCell class="text-center">{{ item.kode }}</TableCell>
                        <TableCell class="text-center">{{ item.nama}}</TableCell>
                        <TableCell class="text-center">{{ item.harga }}</TableCell>
                        <TableCell class="text-center">{{ item.stok }}</TableCell>
                        <TableCell class="text-center">{{ item.dosis }}</TableCell>
                        <TableCell class="flex gap-1 justify-center">
                            <UpdateStockMedicineButton :nama="item.nama" :id="item.kode" :stok="item.stok" @update="handleUpdateStock" />
                            <UpdateMedicineButton :kode="item.kode" :nama="item.nama" :dosis="item.dosis" :harga="item.harga" @update="handleUpdate"/>
                            <DeleteMedicineButton :nama="item.nama" :kode="item.kode" @delete="handleDelete"/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </div>
</template>