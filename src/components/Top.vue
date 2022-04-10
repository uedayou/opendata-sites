<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import List from './parts/List.vue'
import useSiteList from '@/common/useSiteList'
const router = useRouter()
const { sites } = useSiteList()
</script>

<template>
  <v-container>
    <nav class="container">
      <ol class="list-reset py-4 md:pl-4 rounded flex bg-grey-light select-none">
        <li class="px-2">Home</li>
      </ol>
    </nav>
    <v-card class="md:mx-4 my-4 px-1 py-20 w-full">
      <h1 class="text-2xl md:text-4xl text-center">オープンデータカタログ検索</h1>
    </v-card>
    <List :sites="sites" :top="true" v-if="sites" />
  </v-container>
</template>
