<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { Card, CardContent } from '@/components/ui/card';
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="py-3">
        <NavigationBar />
      </div>
    </header>
    
    <main class="px-4 sm:px-6 md:px-8 flex justify-center py-6">
      <Card class="w-full shadow-md max-w-4xl rounded-lg">
        <CardContent>
          <router-view />
        </CardContent>
      </Card>
    </main>
  </div>
</template>