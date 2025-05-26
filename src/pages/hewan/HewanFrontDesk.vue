<script setup lang="ts">
import DeleteHewanButton from '@/components/button/hewan/DeleteHewanButton.vue';
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { deleteAnimal, getAllAnimalFrontDesk, type AnimalFrontDeskDto } from '@/services/animal.services';
import { onMounted, ref } from 'vue';
import { toast } from 'vue-sonner';

const data = ref<AnimalFrontDeskDto[]>();

onMounted(async () => {
    await fetchData();
})

const fetchData = async () => {
    data.value = await getAllAnimalFrontDesk();
}

const handleDelete = async (idPemilik: string, namaHewan: string) => {
    try {
        await deleteAnimal(idPemilik, namaHewan);
        toast.success("Successfully deleted animal.");
        await fetchData();
    } catch (error: any) {
        toast.error("Failed to delete Animal.");
    }
}

const handleUpdate = async (idPemilik: string, namaHewan: string) => {
    try {
        toast.success("Successfully updated animal.");
        await fetchData();
    } catch (error: any) {
        toast.error("Failed to update Animal.");
    }
}

defineExpose({
  fetchData
});
</script>

<template>
    <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[10%] text-center">No</TableHead>
                    <TableHead class="text-center">Pemilik</TableHead>
                    <TableHead class="text-center">Jenis Hewan</TableHead>
                    <TableHead class="text-center">Nama Hewan</TableHead>
                    <TableHead class="text-center">Tanggal Lahir</TableHead>
                    <TableHead class="text-center">Foto</TableHead>
                    <TableHead class="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in data">
                    <TableCell class="w-[10%] text-center">{{ index + 1 }}</TableCell>   
                    <TableCell class="text-center">{{ item.pemilik }}</TableCell>   
                    <TableCell class="text-center">{{ item.jenis }}</TableCell>   
                    <TableCell class="text-center">{{ item.nama }}</TableCell>   
                    <TableCell class="text-center">{{ item.tanggalLahir }}</TableCell>   
                    <TableCell class="text-center">{{ item.foto }}</TableCell>   
                    <TableCell class="flex gap-1 justify-center">
                        <router-link to="/jenis-hewan/123/update">
                            <Button>Update</Button>
                        </router-link>
                        <DeleteHewanButton  :nama-hewan="item.nama" :nama-pemilik="item.pemilik" :id-pemilik="item.idPemilik" @delete="handleDelete"/>
                    </TableCell>   
                </TableRow>
            </TableBody>
        </Table>
</template>