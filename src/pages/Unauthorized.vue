<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goToDashboard = () => {
  router.push('/dashboard');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
    <h1 class="text-4xl font-bold mb-4">Access Denied</h1>
    <p class="text-lg mb-8">You don't have permission to access this page.</p>
    <div class="flex gap-4">
        <Button variant="secondary" @click="goBack" size="lg">
            Go Back
        </Button>
        <Button @click="goToDashboard" size="lg">
            Return to Dashboard
        </Button>
    </div>
  </div>
</template>