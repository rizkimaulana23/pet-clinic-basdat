<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
</script>

<template>
    <div class="min-h-[100%] min-w-[100%] flex flex-col items-center justify-center bg-background">
        <div class="w-full max-w-md p-8 space-y-8">
            <div class="text-center space-y-2">
                <h1 class="text-3xl font-bold tracking-tight">Pet Clinic - IKI</h1>
                <p class="text-muted-foreground">Welcome to our veterinary care platform</p>
            </div>
            
            <div class="space-y-4">
                <router-link to="login" class="w-full block">
                    <Button class="w-full" size="lg">
                        Login
                    </Button>
                </router-link>
                <router-link to="register" class="w-full block">
                    <Button variant="outline" class="w-full" size="lg">
                        Register
                    </Button>
                </router-link>
            </div>
        </div>
    </div>
</template>