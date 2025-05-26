<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { SearchIcon } from 'lucide-vue-next';

</script>

<template>
    <div class="flex flex-col w-full gap-4">
        <h1 class="font-bold text-xl">List Client</h1>
        <div class="space-y-1">
            <div class="flex gap-1 w-[20rem]">
                <Input type="text" placeholder="Search Client Name"/>
                <Button>
                    <SearchIcon></SearchIcon>
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="text-center">No</TableHead>
                        <TableHead class="text-center">Email</TableHead>
                        <TableHead class="text-center">Nama</TableHead>
                        <TableHead class="text-center">Jenis</TableHead>
                        <TableHead class="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell class="text-center">1</TableCell>
                        <TableCell class="text-center">client@example.com</TableCell>
                        <TableCell class="text-center">Client 1</TableCell>
                        <TableCell class="text-center">Individu</TableCell>
                        <TableCell class="text-center">
                            <RouterLink to="/klien/123">
                                <Button>
                                    Detail
                                </Button>
                            </RouterLink>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        
    </div>
</template>