<!-- 登录后的主页 /home -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useColorMode } from '@vueuse/core';
import SearchBar from '@/components/SearchBar.vue';
import { HamburgerMenuIcon, SunIcon, MoonIcon, Cross1Icon, ChevronRightIcon } from '@radix-icons/vue';
import i18n from '@/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button';
const route = useRoute();
const currentPath = ref(route.path);
const theme = useColorMode();
const isMenuShow = ref(false);
const emits = defineEmits(['change']);
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

const saveLang = () => {
	localStorage.setItem('lang', i18n.global.locale);
	console.log("???");
}
</script>

<template>
	<header class="w-full block min-w-[360px]">
		<nav class="box-border justify-between flex flex-wrap flex-row items-center mx-0 xl:mx-auto  w-full xl:w-7/12">
			<div class="flex my-0 ml-[16px] justify-center h-16 items-center">
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
								{{ $t('navbar.home') }}
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
								{{ $t('navbar.account') }}
							</span>
						</router-link>
					</li>
				</ul>
			</div>
			<ul class="hidden flex-row mr-[16px] sm:flex">
				<li class="ms-[0px]">
					<div clss="flex h-full my-0 mx-[16px] items-center">
						<SearchBar />
					</div>
				</li>
				<li class="ms-[10px]">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
									<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
									<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
								</svg>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
						<!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator /> -->
							<DropdownMenuRadioGroup v-model="i18n.global.locale" @update:modelValue="saveLang">
								<DropdownMenuRadioItem value="zh-cn">
									简体中文
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="en">
									English
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="ja-jp">
									日本語
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</li>
				<li class="ms-[0px]">
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
									{{ $t('navbar.home') }}
								</span>
								<ChevronRightIcon class="h-4 w-4" />
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/account">
							<div class="flex h-12 flex-row justify-between text-center items-center pr-[16px]">
								<span>
									{{ $t('navbar.account') }}
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
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Button variant="ghost">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
												<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
												<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
											</svg>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
									<!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator /> -->
										<DropdownMenuRadioGroup v-model="i18n.global.locale" @update:modelValue="saveLang">
											<DropdownMenuRadioItem value="zh-cn">
												简体中文
											</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value="en">
												English
											</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value="ja-jp">
												日本語
											</DropdownMenuRadioItem>
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
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
