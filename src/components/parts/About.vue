<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
const dialog = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val),
})
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog">
      <v-card class="rounded-lg" :class="{ 'overflow-y-auto': dialog }">
        <v-card-title>
          <span class="text-h5">オープンデータカタログ検索について</span>
        </v-card-title>
        <v-card-text class="grid gap-x-2 gap-y-4">
          <p>ここでは、日本国内で公開されるオープンデータカタログサイトを検索することができます。</p>
          <p>
            検索できるサイトは、2022年3月現在
            <a href="https://www.digital.go.jp/" target="_blank" rel="noopener noreferrer">DATA.GO.JP</a>
            の
            <a
              href="https://www.data.go.jp/list-of-database/search-of-the-databases"
              target="_blank"
              rel="noopener noreferrer"
              >データベースサイト一覧</a
            >
            に登録されたものが対象になります。
          </p>
          <p>一部サイトは移転等によりURLがアクセス出来なくなっているものがあります。</p>
          <p>
            登録サイトについては、
            <a href="https://uedayou.net/ldapinavi/" target="_blank" rel="noopener noreferrer">Linked Data API Navi</a>
            で、Web API として検索が可能です。
          </p>
          <p>詳しくは、以下を参照ください。</p>
          <p>
            <a href="https://uedayou.net/ldapinavi/data.go.jp/dbsites" target="_blank" rel="noopener noreferrer">
              データベースサイト一覧(DATA.GO.JP)
            </a>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> 閉じる </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style lang="scss">
.v-dialog {
  .v-overlay {
    &__content {
      max-height: calc(100% - 48px) !important;
      max-width: calc(100% - 2rem) !important;
      @apply flex flex-col m-4;
    }
  }
}
</style>
