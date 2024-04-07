<!-- 登录后的主页 /home -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useColorMode } from '@vueuse/core'
import SearchBar from '@/components/SearchBar.vue'
import { HamburgerMenuIcon, SunIcon, MoonIcon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
const route = useRoute();
const currentPath = ref(route.path);
const theme = useColorMode();

watch(route, () => {
	currentPath.value = route.path;
});

const showMenu = () => {

}

const switchTheme = () => {
	if(theme.value == 'dark') {
		theme.value = 'light';
	}
	else {
		theme.value = 'dark';
	}
}
</script>

<template>
	<header class="w-full flex justify-center">
		<nav
			class="box-border justify-between flex flex-row mx-0 lg:mx-auto items-center h-16 w-full max-w-3xl lg:w-5/12">
			<div class="flex my-0 mx-[16px] justify-center items-center">
				<router-link class="block text-2xl font-bold" to="/">
					Post
				</router-link>
				<ul class="hidden flex-row mx-[16px] sm:flex">
					<li class="ms-[15px]">
						<router-link to="/home">
							<span :class="{
								'border-solid': currentPath === '/home',
								'border-b-2': currentPath === '/home',
								'border-current': currentPath === '/home',
							}">
								世界线
							</span>
						</router-link>
					</li>
					<li class="ms-[20px]">
						<router-link to="/account">
							<span :class="{
								'border-solid': currentPath === '/account',
								'border-b-2': currentPath === '/account',
								'border-current': currentPath === '/account',
							}">
								个人
							</span>
						</router-link>
					</li>
				</ul>
			</div>
			<ul class="hidden flex-row mx-[16px] sm:flex">
				<li class="ms-[20px]">
					<div clss="flex h-full my-0 mx-[16px] items.center">
						<SearchBar />
					</div>
				</li>
				<li class="ms-[20px]">
					<div clss="flex my-0 mx-[16px] items.center">
						<Button variant="ghost" @click="switchTheme">
							<MoonIcon v-if="theme == 'light'" class="h-4 w-4" />
							<SunIcon v-else class="h-4 w-4" />
						</Button>
					</div>
				</li>
			</ul>
			<div class="flex my-0 mx-[16px] items.center sm:hidden">
				<Button variant="ghost" @click="showMenu">
					<HamburgerMenuIcon class="h-4 w-4" />
				</Button>
			</div>
		</nav>
	</header>
</template>

<style scoped></style>
