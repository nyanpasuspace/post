<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const logout = (() => {
    localStorage.removeItem('sessionId');
    location.reload();
});

const editProfile = (() => {
    // TODO 弹出弹窗编辑基本资料
})
</script>

<template>
    <div class="flex items-center space-x-2 pl-2 pt-2 pb-2 pr-0 w-full h-18 rounded-md text-foreground">
        <div class="flex h-14 w-14 items-center justify-center">
            <Avatar class="w-full h-auto">
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div class="w-[150px] h-14 flex flex-col justify-between">
            <div class="h-7 align-top p-1 text-foreground text-lg align-bottom">
                <span>
                    Username
                </span>
            </div>
            <div class="h-7 align-top p-1 text-slate-400 text-sm align-baseline">
                <span>
                    Status
                </span>
            </div>
        </div>
        <div class="h-14 grow flex flex-row pl-2 space-x-4 justify-end items-center text-center">
            <Button variant="secondary" @click="editProfile">
                编辑
            </Button>
            <Button variant="destructive" @click="logout">
                登出
            </Button>
        </div>
    </div>
</template>