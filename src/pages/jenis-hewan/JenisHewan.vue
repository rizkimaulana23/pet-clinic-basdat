<script setup lang="ts">
import DeleteJenisHewanButton from '@/components/button/jenis_hewan/DeleteJenisHewanButton.vue';
import CreateJenisHewanButton from '@/components/button/jenis_hewan/CreateJenisHewanButton.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import UpdateJenisHewanButton from '@/components/button/jenis_hewan/UpdateJenisHewanButton.vue';
import { onMounted, ref } from 'vue';
import { createAnimalTypes, deleteAnimalTypes, getAllAnimalTypes, updateAnimalTypes, type AnimalTypesDto } from '@/services/animal-type.services';
import { toast } from 'vue-sonner';

const data = ref<AnimalTypesDto[]>();

onMounted(async () => {
    await fetchData();
})

const fetchData = async () => {
    data.value = await getAllAnimalTypes();
}

const handleCreate = async (jenis: string) => {
    try {
        await createAnimalTypes(jenis);
        toast.success("Success creating new Animal Types");
        fetchData();
    } catch (error: any) {
        toast.error("Failed creating new Animal Types", {
            description: error.message
        });
    }
}

const handleUpdate = async (id: string, namaJenis: string) => {
    try {
        await updateAnimalTypes(id, namaJenis);
        toast.success("Success updating Animal Types");
        fetchData();
    } catch (error: any) {
        toast.error("Failed updating Animal Types", {
            description: error.message
        })
    }
}

const handleDelete = async (id: string) => {
    try {
        await deleteAnimalTypes(id);
        toast.success("Success deleting Animal Types");
        fetchData();
    } catch (error: any) {
        toast.error("Failed deleting Animal Types", {
            description: error.message
        })
    }
}
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div class="w-full">
            <h1 class="font-bold text-xl">List Jenis Hewan</h1>
        </div>
        <div class="flex justify-end">
            <CreateJenisHewanButton @create="handleCreate"/>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[10%] text-center">No</TableHead>
                    <TableHead class="text-center">Id Jenis</TableHead>
                    <TableHead class="text-center">Nama Jenis</TableHead>
                    <TableHead class="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in data" :key="item.id">
                    <TableCell class="w-[10%] text-center">{{ index + 1 }}</TableCell>   
                    <TableCell class="text-center">{{ item.id }}</TableCell>   
                    <TableCell class="text-center">{{ item.jenis }}</TableCell>   
                    <TableCell class="flex gap-1 justify-center">
                        <UpdateJenisHewanButton :nama-jenis="item.jenis" :id="item.id" @update="handleUpdate"/>
                        <DeleteJenisHewanButton :jenis="item.jenis" :kode="item.id" @delete="handleDelete"/>
                    </TableCell>   
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>