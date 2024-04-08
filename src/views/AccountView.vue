<!-- 登录后的主页 /home -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { useRoute } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import { Separator } from '@/components/ui/separator';
import InfoCard from '@/components/InfoCard.vue';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import MastodonSetting from '@/components/MastodonSetting.vue';
import { Input } from '@/components/ui/input';
import Footer from '@/components/Footer.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const route = useRoute();
const currentPath = ref(route.path);
const messageIsDisabled = ref(true);
const sendTriggers: any = {
  'Mastodon': 'mastodon',
  'Twitter': 'twitter',
};
const sendTriggerValue: any = ref('Mastodon');
watch(route, () => {
  currentPath.value = route.path;
});
const editMessage = (() => {
  messageIsDisabled.value = false;
  // TODO 编辑 message
})
const saveMessage = (() => {
  messageIsDisabled.value = true;
  // TODO 保存 message
})
const sendTime = 0;
const setTimmer = (() => {
  console.log(sendTime)
})
</script>

<template>
  <div class="flex box-border min-h-screen w-full flex-col">
    <NavBar />
    <main class="flex box-border flex-col mx-0 lg:mx-auto  w-full lg:w-7/12">
      <div class="mx-[16px]">
        <InfoCard />
      </div>
      <div class="mx-[16px]">
        <Separator class="my-2" />
      </div>
      <div class="flex flex-col mx-[16px] my-2">
        <div class="grid w-full gap-2">
          <!-- 发送消息设置 -->
          <Label for="message">预设消息</Label>
          <Textarea id="message" placeholder="你好，世界" :disabled="messageIsDisabled" />
          <div class="h-14 grow flex flex-row pl-2 space-x-4 justify-between items-center text-center">
            <div class="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label for="terms" class="truncate">
                发送到此站世界线
              </Label>
            </div>
            <div class="flex items-center pl-2 space-x-4">
              <Button variant="secondary" @click="editMessage">
                编辑
              </Button>
              <Button @click="saveMessage">
                保存
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Separator class="my-2" />
        </div>
        <div>
          <!-- 发送设置 -->
          <div class="flex items-center justify-between space-x-2">
            <Label for="terms" class="truncate">
              发送平台设置
            </Label>
            <Select v-model="sendTriggerValue">
              <SelectTrigger class="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Mastodon">
                    Mastodon
                  </SelectItem>
                  <!-- <SelectItem value="Twitter">
                    Twitter
                  </SelectItem> -->
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col pt-[10px]" v-if="sendTriggers[sendTriggerValue] == 'mastodon'">
            <!-- 实例 URL 和用户 Token -->
            <!-- TODO 授权使用 -->
            <MastodonSetting />
          </div>
          <!-- <div class="flex flex-col pt-[10px]" v-else-if="sendTriggers[sendTriggerValue] == 'twitter'">
            twitter
          </div> -->
          <div class="flex flex-col pt-[10px]" v-else>

          </div>
        </div>
        <div>
          <div class="flex flex-col pt-[20px]">
            <!-- 触发器：设置时间 -->
            <Label for="terms" class="truncate">
              发送时间设置
            </Label>
            <div class="flex pt-[10px]">
              <Input class="w-full pr-[33px]" id="sendTime" type="text" placeholder="999" v-model="sendTime" />
              <div class="relative text-muted-foreground top-[8px] -left-[30px]">天</div>
              <Button class="ml-0" @click="setTimmer">
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
