<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  {
    show: true,
  }
)
const { show } = toRefs(props)
const router = useRouter()
const panel = ref([show.value ? 0 : 1])
watch(show, () => (panel.value = [show.value ? 0 : 1]))
const types = [
  {
    id: 'central-government',
    name: '政府機関',
  },
  {
    id: 'local-government',
    name: '地方公共団体',
  },
  {
    id: 'incorporated-administrative-agency',
    name: '独立行政法人等',
  },
  {
    id: 'nongovernment-organization',
    name: 'その他民間団体等',
  },
]
</script>

<template>
  <v-expansion-panels class="md:px-4 my-4" v-model="panel">
    <v-expansion-panel>
      <v-expansion-panel-title class="select-none"> 提供団体 </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="grid sm:grid-cols-4 gap-4 items-stretch">
          <v-card v-for="type in types" @click="router.push(`/${type.id}`)" class="p-4 text-center cursor-pointer">
            {{ type.name }}
          </v-card>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
