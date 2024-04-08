<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { reactive } from 'vue';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
const mastodonForm = reactive({
  instance: '',
  token: ''
})
const setMastodon = (() => {

})
</script>

<template>
  <form class="w-full space-y-3">
    <FormField v-model="mastodonForm.instance" name="mastodon-instance">
      <FormItem>
        <FormLabel>Mastodon 实例</FormLabel>
        <FormControl>
          <Input id="mastodon-instance" type="text" placeholder="https://mastodon.social"
            v-model="mastodonForm.instance" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-model="mastodonForm.token" name="mastodon-token">
      <FormItem>
        <FormLabel>
          Mastodon Token
          <a href="#" class="text-blue-500 hover:underline" target="_blank">
            查看如何获取 Token
          </a>
        </FormLabel>
        <FormControl>
          <Input id="mastodon-token" type="password" placeholder="TCUM_FawCF1xAHWm-Q6rXo580npMRMxW9apvbjZQzBP"
            v-model="mastodonForm.token" />
        </FormControl>
        <FormDescription>
          设置完成后，将自动发送一条测试消息
        </FormDescription>
      </FormItem>
      <Button @click="setMastodon">保存设置</Button>
    </FormField>
  </form>
</template>