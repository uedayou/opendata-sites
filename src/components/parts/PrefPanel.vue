<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { PREF_LIST } from '@/common'
const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: false,
  }
)
const { show } = toRefs(props)
const router = useRouter()
const panel = ref([show.value ? 0 : 1])
watch(show, () => (panel.value = [show.value ? 0 : 1]))
</script>

<template>
  <v-expansion-panels class="md:px-4 my-4" v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-title class="select-none"> 都道府県(地方公共団体) </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lx:grid-cols-8 gap-4 items-stretch">
          <v-card
            v-for="pref in PREF_LIST"
            @click="router.push(`/local-government/${pref}`)"
            class="p-4 text-center cursor-pointer"
          >
            {{ pref }}
          </v-card>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
