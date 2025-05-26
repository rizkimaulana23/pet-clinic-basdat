<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full px-4 gap-4">
        <h1 class="text-xl font-bold">Pet Clinic - IKI</h1>
        <div class="flex flex-col items-center gap-3">
            <router-link to="login" class="w-32">
                <Button class="w-full">
                    Login
                </Button>
            </router-link>
            <router-link to="register" class="w-32">
                <Button variant="outline" class="w-full">
                    Register
                </Button>
            </router-link>
        </div>
    </div>
</template>