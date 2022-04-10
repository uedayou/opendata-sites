<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import PrefPanel from './PrefPanel.vue'
import TypePanel from './TypePanel.vue'
import useSiteList from '@/common/useSiteList'
import useSearch from '@/common/useSearch'
import { getTypename } from '@/common/'
const props = withDefaults(
  defineProps<{
    sites: Array<any>
    top?: boolean
    type?: string
    pref?: string
  }>(),
  {
    top: false,
  }
)
const { sites, type, pref } = toRefs(props)
const query = ref('')
const page = ref(1)
const itemsPerPage = ref(30)
const router = useRouter()
const { results, search, reset } = useSearch(sites)
watch(
  () => results.value,
  () => (page.value = 1)
)
watch([type, pref], () => (query.value = ''))
</script>

<template>
  <TypePanel :show="true" v-if="top" />
  <PrefPanel :show="!top && !pref" v-if="top || type === 'local-government'" />
  <div class="md:mx-4 my-4 w-full flex">
    <v-text-field
      label="検索"
      placeholder="検索したい語を入力してください"
      variant="outlined"
      hide-details="true"
      append-icon="mdi-magnify"
      :append-inner-icon="query.length > 0 ? 'mdi-close' : ''"
      v-model="query"
      @click:append="search(query)"
      @click:append-inner=";(query = ''), reset()"
      @keyup.enter="search(query)"
    ></v-text-field>
  </div>

  <div class="w-full md:mx-4 my-4 py-10 text-center" v-if="query && results?.length === 0">検索結果がありません。</div>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 md:mx-4 my-4 gap-4 items-stretch w-full" v-if="results">
    <v-card
      v-for="item in results.slice((page - 1) * itemsPerPage || 0, page * itemsPerPage)"
      :key="item.id"
      class="p-4 grid items-center text-center select-none"
    >
      <div v-if="top" @click="router.push(`/${item.type}`)" class="flex-none text-sm text-gray-500 cursor-pointer">
        {{ getTypename(item.type) }}
      </div>
      <div class="grow grid text-center items-center cursor-pointer" @click="router.push(`/${item.type}/${item.id}`)">
        <span class="line-clamp-2">{{ item.name }}</span>
        <span class="line-clamp-2 text-sm text-gray-500">{{ item.author }}</span>
      </div>
      <div
        v-if="item.license"
        @click=";(query = item.license), search(item.license)"
        class="line-clamp-1 text-xs text-gray-500 cursor-pointer"
      >
        {{ item.license }}
      </div>
      <div
        v-if="item.terms"
        class="flex whitespace-nowrap gap-x-2 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300"
      >
        <v-chip
          v-for="term in item.terms"
          @click=";(query = term), search(term)"
          class="text-xs cursor-pointer"
          color="blue"
          variant="outlined"
        >
          {{ term }}
        </v-chip>
      </div>
    </v-card>
  </div>
  <div class="text-center" v-if="results?.length > 0">
    <v-pagination v-model="page" :length="Math.ceil(results.length / itemsPerPage)"></v-pagination>
  </div>
</template>

<style lang="scss">
.v-field,
.v-input {
  &__append {
    &,
    &-inner {
      @apply cursor-pointer;
    }
  }
}
</style>
