<script setup lang="ts">
import { useRouter } from 'vue-router'
import List from './parts/List.vue'
import useSiteList from '@/common/useSiteList'
const router = useRouter()
const { sites, title, type, pref } = useSiteList()
const getTitle = () => (pref.value ? `${title.value}(${pref.value})` : title.value)
</script>

<template>
  <v-container>
    <nav class="container">
      <ol class="list-reset py-4 md:pl-4 rounded flex bg-grey-light select-none">
        <li class="px-2 cursor-pointer" @click="router.push('/')">Home</li>
        <li>/</li>
        <li
          @click="pref && router.push(`/${type}`)"
          :class="{ 'cursor-pointer': pref, 'text-grey': !pref }"
          class="px-2"
        >
          {{ title }}
        </li>
        <template v-if="pref">
          <li>/</li>
          <li class="px-2 text-grey">{{ pref }}</li>
        </template>
      </ol>
    </nav>
    <v-card class="md:mx-4 my-4 px-1 py-20 w-full">
      <h1 class="text-2xl md:text-4xl text-center">
        {{ getTitle() + ' のカタログサイト一覧' }}
      </h1>
    </v-card>
    <List :sites="sites" :type="type" :pref="pref" v-if="sites" />
  </v-container>
</template>
