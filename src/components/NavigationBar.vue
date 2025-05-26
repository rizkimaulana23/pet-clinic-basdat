<script setup lang="ts">
import { logout } from '@/services/authentication.service';
import NavigationMenu from './ui/navigation-menu/NavigationMenu.vue';
import NavigationMenuItem from './ui/navigation-menu/NavigationMenuItem.vue';
import NavigationMenuLink from './ui/navigation-menu/NavigationMenuLink.vue';
import NavigationMenuList from './ui/navigation-menu/NavigationMenuList.vue';
import Button from './ui/button/Button.vue';
</script>

<template>
    <div class="flex justify-between w-full items-center px-4">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <router-link to="/">
                        <NavigationMenuLink class="font-bold text-orange-500 text-xl">
                            Pet Clinic
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <router-link to="/dashboard">
                        <NavigationMenuLink class="font-bold">
                            Dashboard
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/obat">
                        <NavigationMenuLink class="font-bold">
                            Obat
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/vaksin">
                        <NavigationMenuLink class="font-bold">
                            Vaksin
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/vaksinasi">
                        <NavigationMenuLink class="font-bold">
                            Vaksinasi
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/hewan">
                        <NavigationMenuLink class="font-bold">
                            Hewan
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/klien">
                        <NavigationMenuLink class="font-bold">
                            Klien
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/kunjungan">
                        <NavigationMenuLink class="font-bold">
                            Kunjungan
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/perawatan">
                        <NavigationMenuLink class="font-bold">
                            Perawatan
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <router-link to="/jenis-hewan">
                        <NavigationMenuLink class="font-bold">
                            Jenis Hewan
                        </NavigationMenuLink>
                    </router-link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
            <NavigationMenuList>
                <Button @click="logout">
                    Logout
                </Button>
                <!-- <NavigationMenuItem @click="logout">
                    <NavigationMenuLink class="font-bold">
                        Logout
                    </NavigationMenuLink>
                </NavigationMenuItem> -->
            </NavigationMenuList>
        </NavigationMenu>
    </div>
</template>