<script setup lang="ts">
import { useRouter } from 'vue-router'
import useSiteList from '@/common/useSiteList'
const router = useRouter()
const { site, title, type, typename } = useSiteList()
const getURI = (data: unknown) =>
  'https://www.data.go.jp/multidatabases/multidatabase_contents/detail/' + data.typeid + '/' + data.id
const getLicenseUrl = (license: string) => {
  switch (license) {
    case '政府標準利用規約（第 2.0 版）':
      return 'https://www.kantei.go.jp/jp/singi/it2/densi/kettei/gl2_betten_1.pdf'
    case 'CC-BY':
      return 'https://creativecommons.org/licenses/by/4.0/deed.ja'
  }
}
</script>

<template>
  <v-container>
    <nav class="container">
      <ol class="list-reset py-4 pl-4 rounded flex flex-wrap bg-grey-light select-none">
        <li class="px-2 cursor-pointer" @click="router.push('/')">Home</li>
        <li>/</li>
        <li class="px-2 cursor-pointer" @click="router.push(`/${type}`)">
          {{ typename }}
        </li>
        <template v-if="site?.pref">
          <li>/</li>
          <li @click="router.push(`/${type}/${site.pref}`)" class="px-2 cursor-pointer">
            {{ site.pref }}
          </li>
        </template>
        <li>/</li>
        <li class="px-2 text-grey">{{ title }}</li>
      </ol>
    </nav>
    <v-card class="md:mx-4 my-4 md:px-4 py-20">
      <h1 class="text-2xl md:text-4xl text-center">
        {{ title }}
      </h1>
    </v-card>
    <v-card class="md:mx-4 my-4 md:px-4 py-4">
      <v-table v-if="site">
        <tbody>
          <tr>
            <td>名称</td>
            <td>{{ title }}</td>
          </tr>
          <tr>
            <td>URL</td>
            <td>
              <a :href="site.url" target="_blank" rel="noopener noreferrer">{{ site.url }}</a>
            </td>
          </tr>
          <tr>
            <td>作成者</td>
            <td>{{ site.author }}</td>
          </tr>
          <tr v-if="site.pref">
            <td>都道府県</td>
            <td>{{ site.pref }}</td>
          </tr>
          <tr>
            <td>詳細</td>
            <td>{{ site.desc }}</td>
          </tr>
          <tr>
            <td>ライセンス</td>
            <td>
              <a
                v-if="getLicenseUrl(site.license)"
                :href="getLicenseUrl(site.license)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ site.license }}
              </a>
              <span v-else>{{ site.license || '－' }}</span>
            </td>
          </tr>
          <tr>
            <td>APIの有無</td>
            <td>{{ site.API }}</td>
          </tr>
          <tr v-if="site.terms">
            <td>タグ</td>
            <td class="flex items-center gap-y-1 gap-x-2 whitespace-nowrap">
              <v-chip v-for="term in site.terms" color="blue" variant="outlined">{{ term }}</v-chip>
            </td>
          </tr>
          <tr>
            <td>更新日</td>
            <td>{{ site.date }}</td>
          </tr>
          <tr v-if="site.note">
            <td>備考</td>
            <td>{{ site.note }}</td>
          </tr>
          <tr>
            <td>Data.go.jp</td>
            <td>
              <a :href="getURI(site)" target="_blank" rel="noopener noreferrer">{{ getURI(site) }}</a>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>
