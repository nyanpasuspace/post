<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
import { Toaster } from '@/components/ui/toast'
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <div class="py-28">
            <LoginForm />
        </div>
        <span>
            <Toaster />
        </span>
    </div>
</template>

<style scoped>

</style>
