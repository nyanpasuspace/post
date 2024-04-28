<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import router from '@/router';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
defineProps<{ 
    username: string,
    status: string,
    avatarUrl: string,
    changeAvatarFile: Function,
    saveProfile: any
}>()
const logout = (() => {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('userId');
    router.push('/');
});

const editProfile = (() => {
    // TODO 弹出弹窗编辑基本资料
})
</script>

<template>
    <div class="flex items-center space-x-2 pl-2 pt-2 pb-2 pr-0 w-full h-18 rounded-md text-foreground">
        <div class="flex h-14 w-14 items-center justify-center">
            <Avatar class="w-full min-w-[50px] h-auto">
                <AvatarImage :src="avatarUrl" :alt="username" />
                <AvatarFallback>{{ username }}</AvatarFallback>
            </Avatar>
        </div>
        <div class="max-w-[150px] w-full h-14 flex flex-col justify-between">
            <div class="h-7 p-1 text-foreground text-lg align-bottom truncate">
                <span>
                    {{ username }}
                </span>
            </div>
            <div class="h-7 align-top p-1 text-slate-400 text-sm truncate">
                <span>
                    {{ status }}
                </span>
            </div>
        </div>
        <div class="h-14 grow flex flex-row pl-2 space-x-4 justify-end items-center text-center">
            <Dialog>
                <DialogTrigger as-child>
                    <Button variant="secondary" @click="editProfile">
                        {{ $t('account.editAccount') }}
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>编辑用户名和头像</DialogTitle>
                    <!-- <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                    </DialogDescription> -->
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        Username
                    </Label>
                    <Input id="username" value="" class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="avatar" class="text-right">
                        Avatar
                    </Label>
                    <Input id="avatar" type="file" accept="image/jpeg" @change="changeAvatarFile" class="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button @click="saveProfile">
                        保存
                    </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button variant="destructive" @click="logout">
                {{ $t('account.logoutAccount') }}
            </Button>
        </div>
    </div>
</template>