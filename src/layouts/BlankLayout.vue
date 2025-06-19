<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';

</script>

<template>
    <div class="min-h-screen bg-background flex justify-center items-center">      
      <main class="px-4 sm:px-6 md:px-8 flex justify-center py-6">
        <Card class="w-full shadow-md rounded-lg min-w-lg">
          <CardContent>
            <router-view />
          </CardContent>
        </Card>
      </main>
    </div>
  </template>