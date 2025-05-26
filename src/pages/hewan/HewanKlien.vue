<script setup lang="ts">
import DeleteHewanButton from '@/components/button/hewan/DeleteHewanButton.vue';
import UpdateHewanKlienButton from '@/components/button/hewan/UpdateHewanKlienButton.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { getAllAnimalKlien, type AnimalKlienDto } from '@/services/animal.services';
import { getCurrentUser } from '@/services/authentication.service';
import { onMounted, ref } from 'vue';

const data = ref<AnimalKlienDto[]>();

const fetchData = async () => {
    data.value = await getAllAnimalKlien(getCurrentUser()?.email ?? '');
}

onMounted(async () => {
    await fetchData();
})

defineExpose({
  fetchData
});

</script>

<template>
    <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[10%] text-center">No</TableHead>
                    <TableHead class="text-center">Jenis Hewan</TableHead>
                    <TableHead class="text-center">Nama Hewan</TableHead>
                    <TableHead class="text-center">Tanggal Lahir</TableHead>
                    <TableHead class="text-center">Foto</TableHead>
                    <TableHead class="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="(item, index) in data" :key="item.nama">
                    <TableCell class="w-[10%] text-center">{{ index + 1 }}</TableCell>   
                    <TableCell class="text-center">{{ item.jenis }}</TableCell>   
                    <TableCell class="text-center">{{ item.nama }}</TableCell>   
                    <TableCell class="text-center">{{ item.tanggalLahir }}</TableCell>   
                    <TableCell class="text-center">{{ item.foto }}</TableCell>   
                    <TableCell class="flex gap-1 justify-center">
                        <UpdateHewanKlienButton :hewan="{
                            jenis: item.jenis,
                            nama: item.nama,
                            tanggalLahir: item.tanggalLahir.split('T')[0],
                            url: item.foto
                        }"/>
                        <DeleteHewanButton nama-hewan="" nama-pemilik="" id-pemilik=""/>
                    </TableCell>   
                </TableRow>
            </TableBody>
        </Table>
</template>