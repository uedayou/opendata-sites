import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from 'vue-router'
import { PREF_LIST } from '@/common'
import Top from '@/components/Top.vue'
import Type from '@/components/Type.vue'
import Site from '@/components/Site.vue'

const routes = [
  { path: '/', component: Top },
  {
    path: '/:type(central-government|incorporated-administrative-agency|nongovernment-organization)',
    component: Type,
  },
  {
    path: '/:type(central-government|incorporated-administrative-agency|nongovernment-organization)/:siteId',
    component: Site,
  },
  {
    path: '/:type(local-government)',
    component: Type,
  },
  {
    path: `/:type(local-government)/:pref(${[
      ...PREF_LIST,
      ...PREF_LIST.map((pref: string) => encodeURIComponent(pref)),
    ].join('|')})`,
    component: Type,
  },
  {
    path: '/:type(local-government)/:siteId',
    component: Site,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  //history: createWebHistory(),
  routes,
})

export default router
