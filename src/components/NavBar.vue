<!-- 登录后的主页 /home -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useColorMode } from '@vueuse/core'
import SearchBar from '@/components/SearchBar.vue'
import { HamburgerMenuIcon, SunIcon, MoonIcon, Cross1Icon, ChevronRightIcon } from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
const route = useRoute();
const currentPath = ref(route.path);
const theme = useColorMode();
const isMenuShow = ref(false);
watch(route, () => {
	currentPath.value = route.path;
});

const showMenu = () => {
	console.log("???");
	isMenuShow.value = !isMenuShow.value;
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
	<header class="w-full block min-w-[350px]">
		<nav class="box-border justify-between flex flex-wrap flex-row items-center mx-0 lg:mx-auto  w-full lg:w-7/12">
			<div class="flex my-0 mx-[16px] justify-center h-16 items-center">
				<router-link class="block text-2xl font-bold" to="/home">
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
					<div clss="flex h-full max-w-[200px] my-0 mx-[16px] items-center">
						<SearchBar />
					</div>
				</li>
				<li class="ms-[20px]">
					<div clss="flex my-0 mx-[16px] items-center">
						<Button variant="ghost" @click="switchTheme">
							<MoonIcon v-if="theme == 'light'" class="h-4 w-4" />
							<SunIcon v-else class="h-4 w-4" />
						</Button>
					</div>
				</li>
			</ul>
			<div class="flex my-0 mx-[16px] items.center sm:hidden">
				<Button variant="ghost" @click="showMenu">
					<HamburgerMenuIcon v-if="!isMenuShow" class="h-4 w-4" />
					<Cross1Icon v-else class="h-4 w-4" />
				</Button>
			</div>
			<div v-show="isMenuShow" class="px-[16px] pb-[10px] basis-full inline-block sm:hidden border-b-2">
				<ul>
					<li>
						<router-link to="/home">
							<div class="flex h-12 flex-row justify-between text-center items-center pr-[16px]">
								<span>
									世界线
								</span>
								<ChevronRightIcon class="h-4 w-4" />
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/account">
							<div class="flex h-12 flex-row justify-between text-center items-center pr-[16px]">
								<span>
									个人
								</span>
								<ChevronRightIcon class="h-4 w-4" />
							</div>
						</router-link>
					</li>
					<li>
						<div class="flex h-12 flex-row justify-between text-center items-center">
							<div clss="grow h-10 my-0 mx-[16px] items-center">
								<SearchBar />
							</div>
							<div clss="flex-none my-0 items-center">
								<Button variant="ghost" @click="switchTheme">
									<MoonIcon v-if="theme == 'light'" class="h-4 w-4" />
									<SunIcon v-else class="h-4 w-4" />
								</Button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<style scoped></style>
