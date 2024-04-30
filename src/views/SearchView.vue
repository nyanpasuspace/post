<!-- 登录后的搜索页 /search -->
<script lang="ts">
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import MessageCard from '@/components/MessageCard.vue';
import { Loader2 } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { instance } from '@/api/instance';

export default {
  async beforeRouteUpdate (to, _from) {
    this.query = to.query.query;
    this.fetchData();
  },
  setup() {
    const route = useRoute();
    const currentPath = ref(route.path);
    watch(route, () => {
      currentPath.value = route.path;
    });
  },
  data() {
    var query;
    if(typeof this.$route.query.query == 'undefined') {
        query = '';
    }
    else {
        query = this.$route.query.query;
    }
    return {
      messageData: null as any,
      loading: true,
      query,
    }
  },
  mounted() {
    instance.get(`/message/${this.query}`, {
      params: {
        sessionId: localStorage.getItem('sessionId'),
        userId: localStorage.getItem('userId'),
      }
    })
    .then((res: any) => {
      if(res.data.data.length !== 0) {
        this.messageData = res.data.data;
      }
      else {
        this.messageData = null;
      }
      return res.data;
    })
    .catch((error: any) => {
      console.log(error.name);
      return null;
    })
    this.loading = false;
  },
  methods: {
    fetchData() {
      instance.get(`/message/${this.query}`, {
        params: {
          sessionId: localStorage.getItem('sessionId'),
          userId: localStorage.getItem('userId'),
        }
      })
      .then((res: any) => {
        if(res.data.data.length !== 0) {
          this.messageData = res.data.data;
        }
        else {
          this.messageData = null;
        }
        return res.data;
      })
      .catch((error: any) => {
        console.log(error.name);
        return null;
      })
      this.loading = false;
    }
  },
  components: {
    NavBar,
    Footer,
    MessageCard,
    Loader2
  }
}
</script>

<template>
  <div class="flex box-border min-h-screen w-full flex-col bg-background">
    <NavBar />
    <main class="flex box-border flex-col mx-0 xl:mx-auto min-w-[360px] min-h-[500px] w-full xl:w-7/12">
      <div class="mx-[16px]">
        <span v-if="$i18n.locale == 'zh-cn'">{{ query }} 的搜索结果：</span>
        <span v-else-if="$i18n.locale == 'en'">The search result of {{ query }}</span>
        <span v-else-if="$i18n.locale == 'ja-jp'">{{ query }} の検索結果：</span>
        <span v-else>{{ query }} 的搜索结果：</span>
      </div>
      <div v-if="!loading">
        <div v-if="messageData" class="mx-[16px] p-[15px] my-[10px] bg-secondary rounded-sm" v-for="item in messageData" :key="item.id">
          <MessageCard :userData="item" />
        </div>
        <div v-else class="mx-[16px] my-[10px]">
          {{ $t('search.emptyContent') }}
        </div>
      </div>
      <div v-else class="flex h-[100px] mx-auto items-center">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>

</style>
