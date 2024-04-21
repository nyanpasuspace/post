<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
defineProps<{
    userData: any
}>()
</script>

<template>
  <div class="w-full flex flex-col">
    <!-- 用户基本信息 -->
    <div class="flex flex-row items-center h-[40px]">
        <div class="flex  items-center justify-center h-[40px]">
            <Avatar clss="w-m-[40px] h-m-[40px]">
                <AvatarImage :src="userData.avatar_url" :alt="userData.username" />
                <AvatarFallback>{{ userData.username }}</AvatarFallback>
            </Avatar>
        </div>
        <div class="flex flex-col pl-[10px] items-left justify-between h-[40px]">
            <div class="align-top text-foreground text-lg truncate">
                {{ userData.username }}
            </div>
            <div class="align-baseline text-slate-400 text-sm truncate">
                <span>offline</span>
                <!-- 虽然一般显示在此页的都是 offline 用户 :D -->
                <!-- <span v-if="userData.is_live">online</span>
                <span v-else>offline</span> -->
            </div>
        </div>
    </div>
    <!-- 用户 Message -->
    <div class="mt-[20px]">
        <v-md-preview class="p-[0px]" :text="userData.message"></v-md-preview>
    </div>
  </div>
</template>
<style>
.github-markdown-body {
    padding: 0 !important;
}
</style>