<!-- 登录后的主页 /home -->
<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import MessageCard from '@/components/MessageCard.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { instance } from '@/api/instance';

export default {
  setup() {
    const route = useRoute();
    const currentPath = ref(route.path);
    watch(route, () => {
      currentPath.value = route.path;
    });
  },
  data() {
    return {
      messageData: null as any,
    }
  },
  mounted() {
    instance.get(`/message`, {
      params: {
        sessionId: localStorage.getItem('sessionId'),
        userId: localStorage.getItem('userId'),
      }
    })
    .then((res: any) => {
      this.messageData = res.data.data;
      return res.data;
    })
    .catch((error: any) => {
      console.log(error.name);
      return null;
    });
  },
  methods: {

  },
  components: {
    NavBar,
    Footer,
    MessageCard
  }
}


</script>

<template>
  <div class="flex box-border min-h-screen w-full flex-col bg-background">
    <NavBar />
    <main class="flex box-border flex-col mx-0 lg:mx-auto min-w-[350px] min-h-[500px] w-full lg:w-7/12">
      <div class="mx-[16px] p-[15px] my-[10px] bg-secondary rounded-sm" v-for="item in messageData" :key="item.id">
        <MessageCard :userData="item" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>

</style>
