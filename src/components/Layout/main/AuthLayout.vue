<script setup lang="ts">
import TopNavbar from '@/components/Layout/TopNavbar.vue'
import Sidebar from '@/components/Layout/SideBar.vue'
import { menuKey } from '@/utils/injectionKeys'

const { pageData } = storeToRefs(usePageStore())
const reportSheetOpen = ref(false)
const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)

provide(menuKey, {
  menuOpen,
  toggleMenu,
})
</script>

<template>
  <div>
    <Sidebar @reportClicked="reportSheetOpen = true" />
    <AppNewReport v-model="reportSheetOpen" />
    <div
      class="flex flex-col transition-[margin]"
      :class="{ 'ml-52': menuOpen, 'ml-24': !menuOpen }"
    >
      <TopNavbar />

      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot></slot>
      </main>
    </div>
  </div>
</template>
