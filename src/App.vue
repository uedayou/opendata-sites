<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import About from '@/components/parts/About.vue'
const router = useRouter()
const dialog = ref(false)
</script>

<template>
  <v-app id="app">
    <v-app-bar class="select-none">
      <v-app-bar-title>
        <span class="cursor-pointer" @click="router.push('/')">オープンデータカタログ検索</span>
      </v-app-bar-title>
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="pt-20">
      <router-view></router-view>
    </v-main>
    <v-footer>
      <v-card elevation="0" rounded="0" class="text-center w-full">
        <v-card-text>
          <a href="https://uedayou.net/" target="_blank" rel="noopener noreferrer" class="no-underline"> @uedayou </a>
          {{ ' ' + new Date().getFullYear() }}. Some rights reserved.
        </v-card-text>
      </v-card>
    </v-footer>
    <About v-model:show="dialog" />
  </v-app>
</template>
